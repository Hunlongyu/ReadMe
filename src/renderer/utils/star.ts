import axios, { AxiosResponse } from 'axios'

/**
 * 列出用户收藏的仓库
 * @param sort created: 创建  updated: 更新
 * @param direction asc: 升序  desc: 降序
 * @param page 页码
 * @param token 用户 token
 * @returns StarredType[]
 */
async function starredRepositoryList (sort = 'created', direction = 'desc', page: number, token: string): Promise<AxiosResponse | []> {
  try {
    const res = await axios.get('https://api.github.com/user/starred', { params: { sort, direction, per_page: 100, page }, headers: { accept: 'application/vnd.github.v3+json', Authorization: `token ${token}` } })
    if (res) return res.data
    return []
  } catch (error) {
    return []
  }
}

// 收藏仓库
async function starRepository (owner: string, repo: string, token: string): Promise<boolean> {
  try {
    const res = await axios.put(`https://api.github.com/user/starred/${owner}/${repo}`, { owner, repo }, { headers: { accept: 'application/vnd.github.v3+json', Authorization: `token ${token}` } })
    return res.status === 204
  } catch (error) {
    return false
  }
}

// 取消收藏仓库
async function unStarRepository (owner: string, repo: string, token: string): Promise<boolean> {
  try {
    const res = await axios.delete(`https://api.github.com/user/starred/${owner}/${repo}`, { headers: { accept: 'application/vnd.github.v3+json', Authorization: `token ${token}` } })
    return res.status === 204
  } catch (error) {
    return false
  }
}

// 检查是否已经收藏过
async function checkStarRepository (owner: string, repo: string, token: string): Promise<boolean> {
  try {
    const res = await axios.get(`https://api.github.com/user/starred/${owner}/${repo}`, { headers: { accept: 'application/vnd.github.v3+json', Authorization: `token ${token}` } })
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

export {
  starRepository,
  unStarRepository,
  checkStarRepository,
  starredRepositoryList,
  repositoryStargazersList
}
