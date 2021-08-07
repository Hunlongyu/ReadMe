import axios from 'axios'
import { getUrlParams } from './tools'
import { UserType } from '../../types'

// 获取用户 token
async function getUserToken (): Promise<string> {
  const code = getUrlParams('code')
  const res = await axios.post('https://github.com/login/oauth/access_token', { code, client_id: process.env.VUE_APP_clientId, client_secret: process.env.VUE_APP_clientSecret }, { headers: { Accept: 'application/vnd.github.v3.star+json' } })
  return res.data.access_token || ''
}

// 获取用户信息， 使用 token
async function getUserInfo (token: string): Promise<UserType> {
  const res = await axios.get('https://api.github.com/user', { headers: { Accept: 'application/vnd.github.v3.star+json', Authorization: `token ${token}` } })
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
