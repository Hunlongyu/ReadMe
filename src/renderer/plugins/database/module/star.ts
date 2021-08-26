import db from '../dexie'
import { Repository } from '@/types'

const { star } = db

export default {
  async add (doc: Repository): Promise<Repository | number> {
    return await star.add(doc)
  },
  async bulkAdd (docs: Repository[]): Promise<Repository|number> {
    return await star.bulkAdd(docs)
  },
  async remove (id: number): Promise<void> {
    return await star.delete(id)
  },
  async clear (): Promise<void> {
    return await star.clear()
  },
  async update (id: number, doc: Repository): Promise<Repository|number> {
    return await star.update(id, doc)
  },
  async find (id: number): Promise<Repository|undefined> {
    return await star.get(id)
  },
  async all (): Promise<Repository[]> {
    return await star.toArray()
  },
  async where (type: string, arg: string): Promise<Repository[]> {
    return await star.where(type).equals(arg).toArray()
  },
  async search (reg: RegExp): Promise<Repository[]> {
    return await star.toArray().then(res => res.filter(f => reg.test(f.full_name)))
  }
}
