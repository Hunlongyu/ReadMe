import Dexie from 'dexie'
import { UserType } from '../../../types'

export class Database extends Dexie {
  me: Dexie.Table<UserType, number>

  constructor () {
    super('Database')

    this.version(1).stores({
      me: 'id, token, name, login, url, html_url, email, avatar_url, type, url, repos_url, organizations_url'
    })

    this.me = this.table('me')
  }
}

const db = new Database()

db.open()

export default db
