use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct RepoOwner {
    pub login: String,
    pub avatar_url: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Repo {
    pub id: u64,
    pub name: String,
    pub full_name: String,
    pub description: Option<String>,
    pub stargazers_count: u64,
    pub language: Option<String>,
    pub updated_at: String,
    pub forks_count: Option<u64>,
    pub watchers_count: Option<u64>,
    pub visibility: Option<String>,
    pub owner: RepoOwner,
    pub default_branch: Option<String>,
}

#[tauri::command]
pub async fn get_user_stars(token: String) -> Result<Vec<Repo>, String> {
    let client = reqwest::Client::new();
    let res = client.get("https://api.github.com/user/starred?per_page=100")
        .header("Authorization", format!("Bearer {}", token))
        .header("User-Agent", "ReadMe-App")
        .header("Accept", "application/vnd.github.v3+json")
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if !res.status().is_success() {
        return Err(format!("GitHub API Error: {}", res.status()));
    }

    let repos = res.json::<Vec<Repo>>().await.map_err(|e| e.to_string())?;
    Ok(repos)
}

#[tauri::command]
pub async fn get_readme_content(token: String, owner: String, repo: String) -> Result<String, String> {
    let client = reqwest::Client::new();
    let url = format!("https://api.github.com/repos/{}/{}/readme", owner, repo);
    
    let res = client.get(&url)
        .header("Authorization", format!("Bearer {}", token))
        .header("User-Agent", "ReadMe-App")
        .header("Accept", "application/vnd.github.raw")
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if !res.status().is_success() {
        if res.status() == reqwest::StatusCode::NOT_FOUND {
            return Ok("No README found.".to_string());
        }
        return Err(format!("GitHub API Error: {}", res.status()));
    }

    let content = res.text().await.map_err(|e| e.to_string())?;
    Ok(content)
}
