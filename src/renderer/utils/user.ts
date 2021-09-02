import axios from 'axios'
import { Octokit } from '@octokit/core'
import type { PublicUser } from '@/types'
import { SearchUsers } from './search'

// 获取用户 token
async function getUserToken (code: string): Promise<string> {
  const res = await axios.post('https://github.com/login/oauth/access_token', { code, client_id: process.env.VUE_APP_clientId, client_secret: process.env.VUE_APP_clientSecret }, { headers: { Accept: 'application/vnd.github.v3.star+json' } })
  return res.data.access_token
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

interface mdType {
  name: string
  content: string
}

// async function getUserMD (user: PublicUser | SearchUsers) {
//   const login = user.login
//   const md = ['README.md', 'readme.md', 'README.MD', 'Readme.md', 'readme.MD', 'ReadMe.md', 'ReadMe.Md', 'ReadMe.MD', 'README.markdown', 'readme.markdown', 'README', 'readme', 'readMe.md', 'README.textile', 'README.rst']
//   let idx = 0
//   async function getMd (): Promise<mdType> {
//     const url = `https://raw.githubusercontent.com/${login}/${login}/master/${md[idx]}`
//     try {
//       const res = await axios.get(url)
//       return { name: md[idx], content: res.data }
//     } catch (error) {
//       idx++
//       if (idx < md.length) {
//         const res = await getMd()
//         if (res) return res
//         return { name: md[idx], content: '' }
//       } else {
//         return { name: md[idx], content: '' }
//       }
//     }
//   }
//   const result = await getMd()
//   if (result.name && result.content) return result
//   return { name: '', content: '' }
// }

export {
  getUserToken,
  getUserInfo,
  getUserInfoNoToken
}
