import Dexie from 'dexie'
import type { PublicUser, Repository, Settings } from '@/types'
import { initSettings } from './module/init'

export class Database extends Dexie {
  me: Dexie.Table<PublicUser, number>
  star: Dexie.Table<Repository, number>
  settings: Dexie.Table<Settings, number>

  constructor () {
    super('Database')

    this.version(1).stores({
      me: 'id, name, login',
      star: '&id, full_name, language, stargazers_count, forks',
      settings: 'id, userId, token, language, os, theme, refresh'
    })

    this.me = this.table('me')
    this.star = this.table('star')
    this.settings = this.table('settings')
  }
}

const db = new Database()

db.open()

db.on('populate', () => {
  db.settings.bulkAdd(initSettings)
})

export default db
