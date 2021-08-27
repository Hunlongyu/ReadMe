import { Octokit } from '@octokit/core'
import type { Repository } from '@/types'
import { getToken } from './tools'

// 反馈 md 没有发现
async function sendIssues_MdNotFound (repo: Repository): Promise<boolean> {
  const token = await getToken()
  const octokit = new Octokit({ auth: token })
  if (!repo.owner?.login) return false
  await octokit.request('POST /repos/{owner}/{repo}/issues', {
    owner: 'Hunlongyu',
    repo: 'ReadMe',
    title: '[README.md not found!]',
    body: `${repo.full_name}: ${repo.html_url}`,
    assignee: 'Hunlongyu',
    labels: ['enhancement']
  })
  return true
}

export {
  sendIssues_MdNotFound
}
