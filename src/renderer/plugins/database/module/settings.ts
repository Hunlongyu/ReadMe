import db from '../dexie'
import { Settings } from '@/types'
const { settings } = db

export default {
  async get (): Promise<Settings | undefined> {
    return await settings.get({ id: 0 })
  },
  async update (docs: Settings): Promise<Settings | number> {
    if (docs.id) docs.id = 0
    return await settings.update(0, docs)
  },
  async clear (): Promise<void> {
    return await settings.clear()
  },
  async add (doc: Settings): Promise<number> {
    return await settings.add(doc)
  }
}
