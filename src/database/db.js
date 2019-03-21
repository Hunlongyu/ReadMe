import Dexie from 'dexie'

const db = new Dexie('MdDB')
db.version(1).stores({
  md: '++id, repository, tag, url'
})
db.open()

export default db
