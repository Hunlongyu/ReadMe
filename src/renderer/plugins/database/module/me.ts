import db from '../dexie'
import { PublicUser } from '@/types'
import { settings } from '../index'
const { me } = db

export default {
  async get (): Promise<PublicUser | undefined> {
    const s = await settings.get()
    if (s) {
      return me.get({ id: s.userId })
    }
  },
  async update (docs: PublicUser): Promise<PublicUser | number> {
    return me.update(docs.id, docs)
  },
  async remove (): Promise<void> {
    const s = await settings.get()
    if (s) {
      return me.delete(s.userId)
    }
  },
  async clear (): Promise<void> {
    return me.clear()
  },
  async add (doc: PublicUser): Promise<number> {
    return me.add(doc)
  }
}
