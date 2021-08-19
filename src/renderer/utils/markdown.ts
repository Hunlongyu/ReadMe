import axios from 'axios'
import Mdit from 'markdown-it'
import hljs from 'highlight.js'
import { Repository } from '@/types'

interface mdType {
  name: string
  content: string
}

// 获取 README.md 的内容
async function getReadMeMd (repo: Repository): Promise<mdType> {
  const default_branch = repo.default_branch
  const full_name = repo.full_name
  const md = ['README.md', 'readme.md', 'README.MD', 'Readme.md', 'readme.MD', 'ReadMe.md', 'ReadMe.Md', 'ReadMe.MD', 'README.markdown', 'readme.markdown', 'README', 'readme', 'README.textile']
  let idx = 0
  async function getMd (): Promise<mdType> {
    const url = `https://raw.githubusercontent.com/${full_name}/${default_branch}/${md[idx]}`
    try {
      const res = await axios.get(url)
      return { name: md[idx], content: res.data }
    } catch (error) {
      idx++
      if (idx < md.length) {
        const res = await getMd()
        if (res) return res
        return { name: md[idx], content: '' }
      } else {
        return { name: md[idx], content: '' }
      }
    }
  }
  const result = await getMd()
  if (result) return result
  return { name: md[idx], content: '' }
}

// 渲染 markdown 文本
async function renderMarkdwon ({ content }: mdType): Promise<string> {
  const md = new Mdit({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value
        } catch (__) {}
      }
      return ''
    }
  })
  return md.render(content)
}

export {
  getReadMeMd,
  renderMarkdwon
}
