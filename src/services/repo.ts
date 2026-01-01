import { invoke } from '@tauri-apps/api/core';

export interface RepoOwner {
  login: string;
  avatar_url: string;
}

export interface BackendRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  forks_count: number | null;
  watchers_count: number | null;
  visibility: string | null;
  owner: RepoOwner;
  default_branch: string | null;
}

export interface Repo {
  id: number;
  owner: string; // Flattened for UI
  name: string;
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  visibility: string;
  language: string;
  updatedAt: string;
  avatarUrl: string;
}

export const repoService = {
  async getUserStars(token: string): Promise<Repo[]> {
    const backendRepos = await invoke<BackendRepo[]>('get_user_stars', { token });
    
    return backendRepos.map(r => ({
      id: r.id,
      owner: r.owner.login,
      name: r.name,
      description: r.description || '',
      stars: r.stargazers_count,
      forks: r.forks_count || 0,
      watchers: r.watchers_count || 0,
      visibility: r.visibility || 'public',
      language: r.language || 'Unknown',
      updatedAt: r.updated_at,
      avatarUrl: r.owner.avatar_url,
    }));
  },

  async getReadmeContent(token: string, owner: string, repo: string): Promise<string> {
    return await invoke<string>('get_readme_content', { token, owner, repo });
  }
};
