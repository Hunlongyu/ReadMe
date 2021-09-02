import db from '../dexie'
import { Settings } from '@/types'
const { settings } = db

export default {
  async get (): Promise<Settings | undefined> {
    return settings.get({ id: 0 })
  },
  async update (docs: Settings): Promise<Settings | number> {
    if (docs.id) docs.id = 0
    return settings.update(0, docs)
  },
  async clear (): Promise<void> {
    return settings.clear()
  },
  async add (doc: Settings): Promise<number> {
    return settings.add(doc)
  }
}
