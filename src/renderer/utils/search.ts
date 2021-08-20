import { Octokit } from '@octokit/core'
import { getToken } from './tools'
import { components } from '@octokit/openapi-types'

export type SearchRepository = components['schemas']['repo-search-result-item']
export type SearchCode = components['schemas']['code-search-result-item']
export type SearchCommit = components['schemas']['commit-search-result-item']
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

// 提交搜索
export interface SearchCommitType {
  incomplete_results: boolean
  items: SearchCommit[]
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
  commits: SearchCommitType
  issues: SearchIssuesType
  users: SearchUsersType
}

export interface searchNumberType {
  code: number,
  commits: number,
  issues: number,
  repositories: number
  topics: number
  users: number
}

interface labelValueType {
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

// 搜索代码
async function searchCode (sortFilter: string, q: string, page: number): Promise<SearchCodeType> {
  const token = await getToken()
  const octokit = new Octokit({ auth: token })
  let sort: 'indexed' | undefined = 'indexed'
  let order: 'desc' | 'asc' | undefined = 'desc'
  if (sortFilter === '1') { sort = undefined; order = 'desc' }
  if (sortFilter === '2') { sort = 'indexed'; order = 'desc' }
  if (sortFilter === '3') { sort = 'indexed'; order = 'asc' }
  const codes = await octokit.request('GET /search/code', { q, sort, order, per_page: 100, page })
  return codes.data
}

// 搜索提交记录
async function searchCommits (sortFilter: string, q: string, page: number): Promise<SearchCommitType> {
  const token = await getToken()
  const octokit = new Octokit({ auth: token })
  let sort: 'indexed' | undefined = 'indexed'
  let order: 'desc' | 'asc' | undefined = 'desc'
  if (sortFilter === '1') { sort = undefined; order = 'desc' }
  if (sortFilter === '2') { sort = 'indexed'; order = 'desc' }
  if (sortFilter === '3') { sort = 'indexed'; order = 'asc' }
  const commits = await octokit.request('GET /search/commit', { q, sort, order, per_page: 100, page })
  return commits.data
}

// 各种搜索类型的数量
async function searchTypeNum (txt: string): Promise<searchNumberType> {
  const numbers: searchNumberType = {
    code: 0,
    commits: 0,
    issues: 0,
    repositories: 0,
    topics: 0,
    users: 0
  }
  const token = await getToken()
  const octokit = new Octokit({ auth: token })
  const code = await octokit.request('GET /search/code', { q: txt, per_page: 1 })
  numbers.code = code.data.total_count
  const commits = await octokit.request('GET /search/commits', { q: txt, per_page: 1, mediaType: { previews: ['cloak'] } })
  numbers.commits = commits.data.total_count
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
  searchCode,
  searchCommits
}
