import { Octokit } from '@octokit/core'
import type { BaseGist } from '@/types'
import { getToken } from './tools'
import axios from 'axios'

// 获取登录用户的 gist 列表
async function getSelfGist (): Promise<BaseGist[]> {
  const token = await getToken()
  const octokit = new Octokit({ auth: token })
  const res = await octokit.request('GET /gists')
  console.log(res)
  return res.data
}

// 获取 gist file 具体内容
async function getGistContent (uri: string): Promise<string> {
  const res = await axios.get(uri)
  return res.data
}

export {
  getSelfGist,
  getGistContent
}
