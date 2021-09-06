import { Octokit } from '@octokit/core'
import { getToken } from './tools'
import type { Thread } from '@/types'

// 反馈 md 没有发现
async function getNotifications (all: boolean, page: number, participating: boolean): Promise<Thread[]> {
  const token = await getToken()
  const octokit = new Octokit({ auth: token })
  const res = await octokit.request('GET /notifications', { all, page, participating })
  return res.data
}

async function readNofification (thread_id: number): Promise<void> {
  const token = await getToken()
  const octokit = new Octokit({ auth: token })
  await octokit.request('PATCH /notifications/threads/{thread_id}', { thread_id })
}

export {
  getNotifications,
  readNofification
}
