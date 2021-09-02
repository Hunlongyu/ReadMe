import db from '../dexie'
import { Repository } from '@/types'

const { star } = db

export default {
  async add (doc: Repository): Promise<Repository | number> {
    return star.add(doc)
  },
  async bulkAdd (docs: Repository[]): Promise<Repository|number> {
    return star.bulkAdd(docs)
  },
  async remove (id: number): Promise<void> {
    return star.delete(id)
  },
  async clear (): Promise<void> {
    return star.clear()
  },
  async update (id: number, doc: Repository): Promise<Repository|number> {
    return star.update(id, doc)
  },
  async find (id: number): Promise<Repository|undefined> {
    return star.get(id)
  },
  async all (): Promise<Repository[]> {
    return star.toArray()
  },
  async where (type: string, arg: string): Promise<Repository[]> {
    return star.where(type).equals(arg).toArray()
  },
  async search (reg: RegExp): Promise<Repository[]> {
    return star.toArray().then(res => res.filter(f => reg.test(f.full_name)))
  }
}
