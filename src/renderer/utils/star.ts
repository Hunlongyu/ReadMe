import axios, { AxiosResponse } from 'axios'
import { StarredType, SelfStarType } from '../../types'
import { getToken } from './tools'
import { star } from '../plugins/database'

/**
 * 列出用户收藏的仓库
 * @param sort created: 创建  updated: 更新
 * @param direction asc: 升序  desc: 降序
 * @param page 页码
 * @param token 用户 token
 * @returns StarredType[]
 */
async function getSelfStarByFilter (sort = 'created', direction = 'desc', page: number): Promise<AxiosResponse | []> {
  try {
    const token = await getToken()
    const res = await axios.get('https://api.github.com/user/starred', { params: { sort, direction, per_page: 100, page }, headers: { accept: 'application/vnd.github.v3+json', Authorization: `token ${token}` } })
    if (res) return res.data
    return []
  } catch (error) {
    return []
  }
}

// 获取登录用户的所有 star
async function getAllSelfStar (): Promise<SelfStarType[] | []> {
  let idx = 1
  const token = await getToken()
  const starList: SelfStarType[] = []
  async function getSelfStar (page: number) {
    const res = await axios.get('https://api.github.com/user/starred', { params: { sort: 'created', direction: 'desc', per_page: 100, page }, headers: { accept: 'application/vnd.github.v3+json', Authorization: `token ${token}` } })
    if (res.data.length > 0) {
      idx++
      starList.push(...res.data)
      getSelfStar(idx)
    } else {
      return starList
    }
  }
  await getSelfStar(idx)
  return starList
}

// 获取查询账号所有 star
async function getUserStar (author: string): Promise<StarredType[] | []> {
  let starIndex = 1
  const starList: StarredType[] = []
  async function getStar (num: number) {
    const res = await axios.get(`https://api.github.com/users/${author}/starred`, { params: { per_page: 100, page: num }, headers: { Accept: 'application/vnd.github.v3.star+json' } })
    if (res.data.length > 0) {
      starIndex++
      starList.push(...res.data)
      getStar(starIndex)
    } else {
      return starList
    }
  }
  getStar(starIndex)
  return starList
}

// 收藏仓库
async function starRepository (fullName: string): Promise<boolean> {
  try {
    const token = await getToken()
    const owner = fullName.split('/')[0]
    const repo = fullName.split('/')[1]
    const res = await axios.put(`https://api.github.com/user/starred/${fullName}`, { owner, repo }, { headers: { accept: 'application/vnd.github.v3+json', Authorization: `token ${token}` } })
    return res.status === 204
  } catch (error) {
    return false
  }
}

// 取消收藏仓库
async function unStarRepository (fullName: string): Promise<boolean> {
  try {
    const token = await getToken()
    const res = await axios.delete(`https://api.github.com/user/starred/${fullName}`, { headers: { accept: 'application/vnd.github.v3+json', Authorization: `token ${token}` } })
    return res.status === 204
  } catch (error) {
    return false
  }
}

// 检查是否已经收藏过
async function checkStarRepository (fullName: string): Promise<boolean> {
  try {
    const token = await getToken()
    const res = await axios.get(`https://api.github.com/user/starred/${fullName}`, { headers: { accept: 'application/vnd.github.v3+json', Authorization: `token ${token}` } })
    return res.status === 204
  } catch (error) {
    return false
  }
}

// 列出该仓库被哪些人收藏
async function repositoryStargazersList (owner: string, repo: string, page: number): Promise<AxiosResponse | []> {
  try {
    const res = await axios.get(`https://api.github.com/repos/${owner}/${repo}/stargazers`, { params: { per_page: 100, page }, headers: { accept: 'application/vnd.github.v3+json' } })
    return res.data
  } catch (error) {
    return []
  }
}

export interface listType {
  id: number
  label: string
  children?: listType[]
}

async function getStarLanguageList (): Promise<listType[]> {
  const all = await star.all()
  const arr = []
  for (let i = 0; i < all.length; i++) {
    const lang = all[i].language
    if (lang) arr.push(lang)
  }
  const data = [...new Set(arr)]
  const time = new Date().getTime()
  const list = []
  for (let i = 0; i < data.length; i++) {
    const doc = {
      id: time + i,
      label: data[i]
    }
    list.push(doc)
  }
  return list
}

export {
  getSelfStarByFilter,
  getAllSelfStar,
  getUserStar,
  starRepository,
  unStarRepository,
  checkStarRepository,
  repositoryStargazersList,
  getStarLanguageList
}
