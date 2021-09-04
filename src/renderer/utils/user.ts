import axios from 'axios'
import { Octokit } from '@octokit/core'
import type { PublicUser } from '@/types'

// 获取用户 token
async function getUserToken (code: string): Promise<string> {
  const isDev = process.env.NODE_ENV !== 'production'
  if (isDev) {
    const res = await axios.post('https://github.com/login/oauth/access_token', { code, client_id: process.env.VUE_APP_clientId, client_secret: process.env.VUE_APP_clientSecret }, { headers: { Accept: 'application/vnd.github.v3.star+json' } })
    return res.data.access_token
  } else {
    const res = await axios.post('https://github.com/login/oauth/access_token', { code, client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET }, { headers: { Accept: 'application/vnd.github.v3.star+json' } })
    return res.data.access_token
  }
}

// 获取用户信息，使用 token
async function getUserInfo (token: string): Promise<PublicUser> {
  const octokit = new Octokit({ auth: token })
  const res = await octokit.request('GET /user')
  return res.data
}

// 获取用户信息，不使用 token。
async function getUserInfoNoToken (name: string): Promise<string> {
  const res = await axios.get(`https://api.github.com/users/${name}`, { headers: { Accept: 'application/vnd.github.v3.star+json' } })
  return res.data || ''
}

export {
  getUserToken,
  getUserInfo,
  getUserInfoNoToken
}
