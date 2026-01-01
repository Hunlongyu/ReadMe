import { invoke } from '@tauri-apps/api/core';
import type { GithubUser } from '@/types';

export const authService = {
  async login(): Promise<string> {
    return await invoke<string>('login_github');
  },

  async getCurrentUser(token: string): Promise<GithubUser> {
    return await invoke<GithubUser>('get_current_user', { token });
  }
};
