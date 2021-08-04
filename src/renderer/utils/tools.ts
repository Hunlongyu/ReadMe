import cheerio from 'cheerio'
import axios from 'axios'
import { trendingRepoType } from '../../type/index'

async function getTrending (s: string, p: string, d: string) {
  let url = 'https://github.com/trending'
  if (p) {
    url += `/${p}`
  }
  if (s) {
    url += `?spoken_language_code=${s}`
  }
  if (d) {
    url += `&since=${d}`
  }
  const list = await getTrendingList(url)
  return list
}

// 获取趋势列表
async function getTrendingList (url: string) {
  const result = await axios.get(url)
  if (result) {
    const data = result.data
    const $ = cheerio.load(data)
    const list: Array<trendingRepoType> = []
    $('.Box-row').each((i, n) => {
      const dom = cheerio.load(n)
      const doc = {
        author: '',
        repo: '',
        describe: '',
        language: '',
        star: 0,
        fork: 0,
        octiconStar: 0
      }
      const title = dom('.h3').text().replace(/\s+/g, '').trim()
      doc.author = title.split('/')[0].trim() || ''
      doc.repo = title.split('/')[1].trim() || ''
      doc.describe = dom('.my-1').text().trim() || ''
      doc.language = dom('.ml-0').text().replace(/\s+/g, ' ').trim() || ''
      doc.star = Number(dom('a > .octicon-star').parent().text().replace(/\s+/g, ' ').replace('Star', '').replace(/,/g, '').trim()) || 0
      doc.fork = Number(dom('a > .octicon-repo-forked').parent().text().replace(/\s+/g, ' ').replace('Star', '').replace(/,/g, '').trim()) || 0
      doc.octiconStar = Number(dom('.float-sm-right').text().trim().split(' ')[0]) || 0
      list.push(doc)
    })
    return list
  }
  return []
}

export {
  getTrending
}