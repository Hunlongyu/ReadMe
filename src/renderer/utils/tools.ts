import { settings } from '../plugins/database'

// 获取链接参数
function getUrlParams (name: string, url?: string): string {
  const uri = url || window.location.search.substring(1)
  const params = new URLSearchParams(uri)
  return params.get(name) || ''
}

async function getToken (): Promise<string | undefined> {
  const res = await settings.get()
  return res?.token
}

export {
  getToken,
  getUrlParams
}
