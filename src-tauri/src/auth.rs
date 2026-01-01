use tauri::Url;
use tauri_plugin_opener::OpenerExt;
use tokio::net::TcpListener;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use serde::{Deserialize, Serialize};
use std::time::Duration;

// TODO: Replace with your actual Client ID and Secret
const CLIENT_ID: &str = "Ov23liV5CRySa6ey7afq";
const CLIENT_SECRET: &str = "8bfc23d542a289de48c9c4799758a67ff741661c";
const REDIRECT_URI: &str = "http://localhost:14200/callback";

#[tauri::command]
pub async fn login_github(app: tauri::AppHandle) -> Result<String, String> {
    // 1. Start local server
    let listener = TcpListener::bind("127.0.0.1:14200").await.map_err(|e| e.to_string())?;
    
    // 2. Open Browser
    let auth_url = format!(
        "https://github.com/login/oauth/authorize?client_id={}&redirect_uri={}&scope=repo,user",
        CLIENT_ID, REDIRECT_URI
    );
    
    // Open URL using Tauri's opener plugin
    app.opener().open_url(auth_url, None::<&str>).map_err(|e| e.to_string())?;

    // 3. Wait for callback
    // We only accept one connection
    // Set a timeout of 60 seconds
    let (mut stream, _) = match tokio::time::timeout(Duration::from_secs(60), listener.accept()).await {
        Ok(Ok(result)) => result,
        Ok(Err(e)) => return Err(e.to_string()),
        Err(_) => return Err("Login timed out. Please try again.".to_string()),
    };
    
    let mut buffer = [0; 1024];
    let n = stream.read(&mut buffer).await.map_err(|e| e.to_string())?;
    
    if n == 0 {
        return Err("Connection closed".to_string());
    }
    
    let request = String::from_utf8_lossy(&buffer[..n]);
    
    // Simple parsing for "code="
    let code = if let Some(start) = request.find("code=") {
        let remainder = &request[start + 5..];
        let end = remainder.find('&').or_else(|| remainder.find(' ')).unwrap_or(remainder.len());
        &remainder[..end]
    } else {
        // Send error response
        let response = "HTTP/1.1 400 Bad Request\r\n\r\nNo code found";
        stream.write_all(response.as_bytes()).await.map_err(|e| e.to_string())?;
        return Err("No code found in callback".to_string());
    };
    
    // Response to browser
    let response = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<html><body><h1>Login Successful!</h1><p>You can close this window now and return to the app.</p><script>setTimeout(() => window.close(), 1000)</script></body></html>";
    stream.write_all(response.as_bytes()).await.map_err(|e| e.to_string())?;
    stream.flush().await.map_err(|e| e.to_string())?;
    
    // 4. Exchange code for token
    let client = reqwest::Client::new();
    let params = [
        ("client_id", CLIENT_ID),
        ("client_secret", CLIENT_SECRET),
        ("code", code),
        ("redirect_uri", REDIRECT_URI),
    ];
    
    let res = client.post("https://github.com/login/oauth/access_token")
        .header("Accept", "application/json")
        .form(&params)
        .send()
        .await
        .map_err(|e| e.to_string())?;
        
    let text = res.text().await.map_err(|e| e.to_string())?;
    
    // Parse JSON
    #[derive(Deserialize)]
    struct TokenResponse {
        access_token: String,
    }
    
    let token_res: TokenResponse = serde_json::from_str(&text).map_err(|e| format!("Failed to parse token response: {} | Raw: {}", e, text))?;
    
    Ok(token_res.access_token)
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GithubUser {
    pub login: String,
    pub avatar_url: String,
    pub name: Option<String>,
}

#[tauri::command]
pub async fn get_current_user(token: String) -> Result<GithubUser, String> {
    println!("Fetching user with token: {}", token);
    let client = reqwest::Client::new();
    let res = client.get("https://api.github.com/user")
        .header("Authorization", format!("Bearer {}", token))
        .header("User-Agent", "ReadMe-App")
        .send()
        .await
        .map_err(|e| e.to_string())?;
        
    if !res.status().is_success() {
        println!("GitHub API Error: {}", res.status());
        return Err(format!("GitHub API Error: {}", res.status()));
    }
    
    let user = res.json::<GithubUser>().await.map_err(|e| e.to_string())?;
    println!("User fetched: {:?}", user);
    Ok(user)
}
