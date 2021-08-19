import axios from 'axios'
import { Octokit } from '@octokit/core'
import { getUrlParams, getToken } from './tools'
import type { PublicUser } from '@/types'

// 获取用户 token
async function getUserToken (): Promise<string> {
  const code = getUrlParams('code')
  const res = await axios.post('https://github.com/login/oauth/access_token', { code, client_id: process.env.VUE_APP_clientId, client_secret: process.env.VUE_APP_clientSecret }, { headers: { Accept: 'application/vnd.github.v3.star+json' } })
  return res.data.access_token || ''
}

// 获取用户信息， 使用 token
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

async function logout (): Promise<boolean> {
  const token = await getToken()
  const octokit = new Octokit({ auth: token })
  if (!token || !process.env.VUE_APP_clientId) return false
  const res = await octokit.request('DELETE /applications/{client_id}/tokens/{access_token}', { access_token: token, client_id: process.env.VUE_APP_clientId })
  console.log(res, '=== logout ===')
  return true
}

export {
  logout,
  getUserToken,
  getUserInfo,
  getUserInfoNoToken
}
