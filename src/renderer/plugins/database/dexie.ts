import Dexie from 'dexie'
import { UserType, SelfStarType } from '../../../types'
import { initMe } from './module/init'

export class Database extends Dexie {
  me: Dexie.Table<UserType, number>
  star: Dexie.Table<SelfStarType, number>

  constructor () {
    super('Database')

    this.version(1).stores({
      me: 'id, token, name, login',
      star: 'id, starred_at, repo'
    })

    this.me = this.table('me')
    this.star = this.table('star')
  }
}

const db = new Database()

db.open()

db.on('populate', () => {
  db.me.bulkAdd(initMe)
})

export default db
