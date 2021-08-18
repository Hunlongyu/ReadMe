import {
  RepoType,
  LicenseType,
  OwnerType,
  PermissionsType
} from './modules'

// 个人信息
export interface UserType {
  avatar_url?: string
  bio?: string
  blog?: string
  company?: string
  created_at?: string
  email?: string
  events_url?: string
  followers?: number
  followers_url?: string
  following?: number
  following_url?: string
  gists_url?: string
  gravatar_id?: string
  hireable?: string
  html_url?: string
  id: number
  location?: string
  login?: string
  name?: string
  node_id?: string
  organizations_url?: string
  public_gists?: number
  public_repos?: number
  received_events_url?: string
  repos_url?: string
  site_admin?: boolean
  starred_url?: string
  subscriptions_url?: string
  twitter_username?: string
  type?: string
  updated_at?: string
  url?: string
  token?: string
}

export interface SelfStarType {
  archive_url?: string
  archived?: boolean
  assignees_url?: string
  blobs_url?: string
  branches_url?: string
  clone_url?: string
  collaborators_url?: string
  comments_url?: string
  commits_url?: string
  compare_url?: string
  contents_url?: string
  contributors_url?: string
  created_at?: string
  default_branch?: string
  deployments_url?: string
  description?: string
  disabled?: boolean
  downloads_url?: string
  events_url?: string
  fork?: boolean
  forks?: number
  forks_count?: number
  forks_url?: string
  full_name?: string
  git_commits_url?: string
  git_refs_url?: string
  git_tags_url?: string
  git_url?: string
  has_downloads?: boolean
  has_issues?: boolean
  has_pages?: boolean
  has_projects?: boolean
  has_wiki?: boolean
  homepage?: string
  hooks_url?: string
  html_url?: string
  id?: number
  issue_comment_url?: string
  issue_events_url?: string
  issues_url?: string
  keys_url?: string
  labels_url?: string
  language?: string
  languages_url?: string
  license?: LicenseType
  merges_url?: string
  milestones_url?: string
  mirror_url?: string
  name?: string
  node_id?: string
  notifications_url?: string
  open_issues?: number
  open_issues_count?: number
  owner?: OwnerType
  permissions?: PermissionsType
  private?: boolean
  pulls_url?: string
  pushed_at?: string
  releases_url?: string
  size?: number
  ssh_url?: string
  stargazers_count?: number
  stargazers_url?: string
  statuses_url?: string
  subscribers_url?: string
  subscription_url?: string
  svn_url?: string
  tags_url?: string
  teams_url?: string
  trees_url?: string
  updated_at?: string
  url?: string
  watchers?: number
  watchers_count?: number
}

// 搜藏仓库 类型
export interface UserStarType {
  starred_at?: string,
  repo?: RepoType
}

// 收藏仓库的人
export interface StargazersType {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface StarredType {
  id: number
  node_id: string
  name: string
  full_name: string
  owner?: {
    login?: string
    id?: number,
    node_id?: string
    avatar_url?: string
    gravatar_id?: string
    url?: string
    html_url?: string
    followers_url?: string
    following_url?: string
    gists_url?: string
    starred_url?: string
    subscriptions_url?: string
    organizations_url?: string
    repos_url?: string
    events_url?: string
    received_events_url?: string
    type?: string
    site_admin?: boolean
  },
  private?: boolean
  html_url?: string
  description?: string
  fork?: boolean
  url?: string
  archive_url?: string
  assignees_url?: string
  blobs_url?: string
  branches_url?: string
  collaborators_url?: string
  comments_url?: string
  commits_url?: string
  compare_url?: string
  contents_url?: string
  contributors_url?: string
  deployments_url?: string
  downloads_url?: string
  events_url?: string
  forks_url?: string
  git_commits_url?: string
  git_refs_url?: string
  git_tags_url?: string
  git_url?: string
  issue_comment_url?: string
  issue_events_url?: string
  issues_url?: string
  keys_url?: string
  labels_url?: string
  languages_url?: string
  merges_url?: string
  milestones_url?: string
  notifications_url?: string
  pulls_url?: string
  releases_url?: string
  ssh_url?: string
  stargazers_url?: string
  statuses_url?: string
  subscribers_url?: string
  subscription_url?: string
  tags_url?: string
  teams_url?: string
  trees_url?: string
  clone_url?: string
  mirror_url?: string
  hooks_url?: string
  svn_url?: string
  homepage?: string
  language?: string
  forks_count?: number
  stargazers_count?: number
  watchers_count?: number
  size?: number
  default_branch?: string
  open_issues_count?: number
  is_template?: boolean
  topics?: string[]
  has_issues?: boolean
  has_projects?: boolean
  has_wiki?: boolean
  has_pages?: boolean
  has_downloads?: boolean
  archived?: boolean
  disabled?: boolean
  visibility?: string
  pushed_at?: string
  created_at?: string
  updated_at?: string
  permissions?: {
    admin?: boolean
    push?: boolean
    pull?: boolean
  },
  allow_rebase_merge?: boolean
  template_repository?: string
  temp_clone_token?: string
  allow_squash_merge?: boolean
  allow_auto_merge?: boolean
  delete_branch_on_merge?: boolean
  allow_merge_commit?: boolean
  subscribers_count?: number
  network_count?: number
  license?: {
    key?: string
    name?: string
    url?: string
    spdx_id?: string
    node_id?: string
    html_url?: string
  },
  forks?: number
  open_issues?: number
  watchers?: number
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

export interface searchType {
  incomplete_results: boolean
  items: StarredType[] | []
  total_count: number
}
