import type { Repo } from '@/services/repo'

export async function renderWithGithubAPI(token: string, text: string, repo: Repo) {
  const body = JSON.stringify({
    text,
    mode: 'gfm',
    context: `${repo.owner}/${repo.name}`,
  })

  // First try with auth (higher rate limits), include User-Agent
  let res = await fetch('https://api.github.com/markdown', {
    method: 'POST',
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      'Accept': 'text/html; charset=utf-8',
      'Content-Type': 'application/json',
      'User-Agent': 'ReadMe-App',
    },
    body,
  })

  if (!res.ok && (res.status === 401 || res.status === 403)) {
    // Fallback without auth to avoid blocking when token is invalid/expired
    res = await fetch('https://api.github.com/markdown', {
      method: 'POST',
      headers: {
        'Accept': 'text/html; charset=utf-8',
        'Content-Type': 'application/json',
        'User-Agent': 'ReadMe-App',
      },
      body,
    })
  }

  if (!res.ok) {
    const msg = await res.text().catch(() => '')
    throw new Error(`GitHub markdown render failed: ${res.status} ${msg}`)
  }
  return await res.text()
}
