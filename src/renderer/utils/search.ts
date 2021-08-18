import axios from 'axios'

import { searchType } from '../../types'

async function searchRepo (txt: string, page: number): Promise<searchType> {
  const res = await axios.get(`https://api.github.com/search/repositories?q=${txt}`, { params: { per_page: 100, page } })
  return res.data
}

export {
  searchRepo
}
