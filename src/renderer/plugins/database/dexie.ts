import Dexie from 'dexie'
import { UserType } from '../../../types'
import { initMe } from './module/init'

export class Database extends Dexie {
  me: Dexie.Table<UserType, number>

  constructor () {
    super('Database')

    this.version(1).stores({
      me: 'id, token, name, login'
    })

    this.me = this.table('me')
  }
}

const db = new Database()

db.open()

db.on('populate', () => {
  db.me.bulkAdd(initMe)
})

export default db
