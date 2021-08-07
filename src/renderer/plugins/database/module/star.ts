import db from '../dexie'
import { SelfStarType } from '../../../../types'

const { star } = db

export default {
  async add (doc: SelfStarType): Promise<SelfStarType | number> {
    return await star.add(doc)
  },
  async bulkAdd (docs: SelfStarType[]): Promise<SelfStarType|number> {
    return await star.bulkAdd(docs)
  },
  async remove (id: number): Promise<void> {
    return await star.delete(id)
  },
  async clear (): Promise<void> {
    return await star.clear()
  },
  async update (id: number, doc: SelfStarType): Promise<SelfStarType|number> {
    return await star.update(id, doc)
  },
  async find (id: number): Promise<SelfStarType|undefined> {
    return await star.get(id)
  },
  async all (): Promise<SelfStarType[]> {
    return await star.toArray()
  },
  async where (type: string, arg: string): Promise<SelfStarType[]> {
    return await star.where(type).equals(arg).toArray()
  }
}
