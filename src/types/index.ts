import { components } from '@octokit/openapi-types'

export type Repository = components['schemas']['repository']
export type FullRepository = components['schemas']['full-repository']
export type PrivateUser = components['schemas']['private-user']
export type PublicUser = components['schemas']['public-user']
export type BaseGist = components['schemas']['base-gist']
export type Thread = components['schemas']['thread']

export interface Settings {
  id: number
  userId: number
  token: string
  language: string
  os: string
  theme: string
}

export interface trendingRepoType {
  author: string
  repo: string
  describe: string
  language: string
  star: number
  fork: number
  octiconStar: number
  fullName: string
}

export interface TreeNodeType {
  id: number
  label: string
  value?: string
  $treeNodeId: string
}
