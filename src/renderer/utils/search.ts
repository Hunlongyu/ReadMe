import { Octokit } from '@octokit/core'
import { getToken } from './tools'
import { SearchRepository } from '@/types'

export interface SearchRepositoryType {
  incomplete_results: boolean
  items: SearchRepository[]
  total_count: number
}

export interface searchNumberType {
  code: number,
  commits: number,
  issues: number,
  repositories: number
  topics: number
  users: number
}

export interface searchCatType {
  q: string
  sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated' | undefined
  order?: 'desc' | 'asc' | undefined
  per_page?: number | undefined
  page: number | undefined
}

async function searchRepo (type: string, txt: string, page: number): Promise<SearchRepositoryType> {
  const token = await getToken()
  const octokit = new Octokit({ auth: token })
  let sort: 'stars' | 'forks' | 'help-wanted-issues' | 'updated' | undefined = 'stars'
  let order: 'desc' | 'asc' | undefined = 'desc'
  if (type === '1') { sort = undefined; order = undefined }
  if (type === '2') { sort = 'stars'; order = 'desc' }
  if (type === '3') { sort = 'stars'; order = 'asc' }
  if (type === '4') { sort = 'forks'; order = 'desc' }
  if (type === '5') { sort = 'forks'; order = 'asc' }
  if (type === '6') { sort = 'updated'; order = 'desc' }
  if (type === '7') { sort = 'updated'; order = 'asc' }
  const repositories = await octokit.request('GET /search/repositories', { q: txt, sort, order, per_page: 100, page })
  return repositories.data
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
  searchRepo
}
