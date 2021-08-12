import db from '../dexie'
import { UserType } from '../../../../types'
const { me } = db

export default {
  async get (): Promise<UserType | undefined> {
    return await me.get({ id: 0 })
  },
  async update (docs: UserType): Promise<UserType | number> {
    if (docs.id) docs.id = 0
    return await me.update(0, docs)
  },
  async clear (): Promise<void> {
    return await me.clear()
  },
  async add (doc: UserType): Promise<number> {
    return await me.add(doc)
  }
}
