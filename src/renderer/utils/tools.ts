import cheerio from 'cheerio'
import axios from 'axios'
import { trendingRepoType } from '../../type/index'

async function spokenLanguageTool (code: string) {
  const result = await axios.get(`https://github.com/trending?spoken_language_code=${code}`)
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
      doc.author = title.split('/')[0].trim()
      doc.repo = title.split('/')[1].trim()
      doc.describe = dom('.my-1').text().trim()

      const info = dom('.d-inline-block').text().replace(/\s+/g, ' ').trim().split(' ')
      if (info.length <= 7) info.unshift('')
      const len = info.length
      doc.language = info[0]
      doc.star = Number(info[len - 7].replace(/,/g, ''))
      doc.fork = Number(info[len - 6].replace(/,/g, ''))
      doc.octiconStar = Number(info[len - 3].replace(/,/g, ''))
      list.push(doc)
    })
    return list
  }
  return []
}

export {
  spokenLanguageTool
}
