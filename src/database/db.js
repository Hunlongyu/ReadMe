import Dexie from 'dexie'

const db = new Dexie('MdDB')
db.version(1).stores({
  md: '++id, repository, tag, mdUrl, htmlUrl, clickNum, description'
})
db.open()

export default db
