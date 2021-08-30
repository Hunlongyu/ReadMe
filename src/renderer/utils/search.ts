import axios from 'axios'
import cheerio from 'cheerio'
import { Octokit } from '@octokit/core'
import { getToken } from './tools'
import { components } from '@octokit/openapi-types'

export type SearchRepository = components['schemas']['repo-search-result-item']
export type SearchCode = components['schemas']['code-search-result-item']
export type SearchIssues = components['schemas']['issue-search-result-item']
export type SearchUsers = components['schemas']['user-search-result-item']

// 仓库搜索
export interface SearchRepositoryType {
  incomplete_results: boolean
  items: SearchRepository[]
  total_count: number
}

// 代码搜索
export interface SearchCodeType {
  incomplete_results: boolean
  items: SearchCode[]
  total_count: number
}

// 反馈搜索
export interface SearchIssuesType {
  incomplete_results: boolean
  items: SearchIssues[]
  total_count: number
}

// 用户搜索
export interface SearchUsersType {
  incomplete_results: boolean
  items: SearchUsers[]
  total_count: number
}

// 不同分类下的搜索内容
export interface searchContentType {
  repositories: SearchRepositoryType
  code: SearchCodeType
  issues: SearchIssuesType
  users: SearchUsersType
}

export interface searchNumberType {
  code: number,
  issues: number,
  repositories: number
  topics: number
  users: number
}

export interface labelValueType {
  label: string
  value: string
}
export interface searchSortType {
  [type: string]: labelValueType[]
}

// 搜索仓库
async function searchRepo (sortFilter: string, q: string, page: number): Promise<SearchRepositoryType> {
  const token = await getToken()
  const octokit = new Octokit({ auth: token })
  let sort: 'stars' | 'forks' | 'help-wanted-issues' | 'updated' | undefined = 'stars'
  let order: 'desc' | 'asc' | undefined = 'desc'
  if (sortFilter === '1') { sort = undefined; order = undefined }
  if (sortFilter === '2') { sort = 'stars'; order = 'desc' }
  if (sortFilter === '3') { sort = 'stars'; order = 'asc' }
  if (sortFilter === '4') { sort = 'forks'; order = 'desc' }
  if (sortFilter === '5') { sort = 'forks'; order = 'asc' }
  if (sortFilter === '6') { sort = 'updated'; order = 'desc' }
  if (sortFilter === '7') { sort = 'updated'; order = 'asc' }
  const repositories = await octokit.request('GET /search/repositories', { q, sort, order, per_page: 100, page })
  return repositories.data
}

// 获取 language 列表
async function getSearchRepoLanguage (q: string): Promise<labelValueType[]> {
  const res = await axios.get(`https://github.com/search?q=${q}`)
  const data = res.data
  const $ = cheerio.load(data)
  const list: labelValueType[] = []
  $('.filter-list li').each((i, n) => {
    const dom = cheerio.load(n)
    const count = dom('.count').text()
    const lng = dom('.filter-item').text().replace(count, '').trim()
    list.push({ label: lng, value: count })
  })
  return list
}

// 搜索代码
async function searchCode (sortFilter: string, q: string, page: number): Promise<SearchCodeType> {
  const token = await getToken()
  const octokit = new Octokit({ auth: token })
  let sort: 'indexed' | undefined = 'indexed'
  let order: 'desc' | 'asc' | undefined = 'desc'
  if (sortFilter === '1') { sort = undefined; order = undefined }
  if (sortFilter === '2') { sort = 'indexed'; order = 'desc' }
  if (sortFilter === '3') { sort = 'indexed'; order = 'asc' }
  const codes = await octokit.request('GET /search/code', { q, sort, order, per_page: 100, page })
  return codes.data
}

async function getCodeContent (url: string): Promise<string> {
  const res = await axios.get(url)
  if (res && res.data.content) {
    const code = window.atob(res.data.content)
    return code
  }
  return ''
}

// 搜索反馈
async function searchIssues (sortFilter: string, q: string, page: number): Promise<SearchIssuesType> {
  const token = await getToken()
  const octokit = new Octokit({ auth: token })
  let sort: 'comments' | 'reactions' | 'reactions-+1' | 'reactions--1' | 'reactions-smile' | 'reactions_face' | undefined = 'comments'
  let order: 'desc' | 'asc' | undefined = 'desc'
  if (sortFilter === '1') { sort = undefined; order = undefined }
  if (sortFilter === '2') { sort = 'comments'; order = 'desc' }
  if (sortFilter === '3') { sort = 'reactions'; order = 'asc' }
  if (sortFilter === '4') { sort = 'reactions'; order = 'desc' }
  if (sortFilter === '5') { sort = 'reactions-+1'; order = 'asc' }
  const issues = await octokit.request('GET /search/issues', { q, sort, order, per_page: 100, page })
  console.log(issues.data, '== issues data ==')
  return issues.data
}

// 搜索用户
async function searchUsers (sortFilter: string, q: string, page: number): Promise<SearchUsersType> {
  const token = await getToken()
  const octokit = new Octokit({ auth: token })
  let sort: 'followers' | 'repositories' | 'joined' | undefined = 'followers'
  let order: 'desc' | 'asc' | undefined = 'desc'
  if (sortFilter === '1') { sort = undefined; order = undefined }
  if (sortFilter === '2') { sort = 'followers'; order = 'desc' }
  if (sortFilter === '3') { sort = 'followers'; order = 'asc' }
  if (sortFilter === '4') { sort = 'repositories'; order = 'desc' }
  if (sortFilter === '5') { sort = 'repositories'; order = 'asc' }
  const users = await octokit.request('GET /search/users', { q, sort, order, per_page: 100, page })
  console.log(users.data, '== users data ==')
  return users.data
}

// 所有的搜索事件
async function allSearchEvent (type: string, sortFilter: string, q: string, page: number): Promise<SearchRepositoryType | SearchCodeType | SearchIssuesType | SearchUsersType | undefined> {
  let res
  if (type === 'repositories') { res = await searchRepo(sortFilter, q, page) }
  if (type === 'code') { res = await searchCode(sortFilter, q, page) }
  if (type === 'issues') { res = await searchIssues(sortFilter, q, page) }
  if (type === 'users') { res = await searchUsers(sortFilter, q, page) }
  return res
}

// 各种搜索类型的数量
async function searchTypeNum (txt: string): Promise<searchNumberType> {
  const numbers: searchNumberType = {
    code: 0,
    issues: 0,
    repositories: 0,
    topics: 0,
    users: 0
  }
  const token = await getToken()
  const octokit = new Octokit({ auth: token })
  const code = await octokit.request('GET /search/code', { q: txt, per_page: 1 })
  numbers.code = code.data.total_count
  const issues = await octokit.request('GET /search/issues', { q: txt, per_page: 1 })
  numbers.issues = issues.data.total_count
  const repositories = await octokit.request('GET /search/repositories', { q: txt, per_page: 1 })
  numbers.repositories = repositories.data.total_count
  const topics = await octokit.request('GET /search/topics', { q: txt, per_page: 1, mediaType: { previews: ['mercy'] } })
  numbers.topics = topics.data.total_count
  const users = await octokit.request('GET /search/users', { q: txt, per_page: 1, mediaType: { previews: ['mercy'] } })
  numbers.users = users.data.total_count
  return numbers
}

export {
  searchTypeNum,
  searchRepo,
  getSearchRepoLanguage,
  searchCode,
  getCodeContent,
  allSearchEvent
}
