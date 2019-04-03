import Nedb from 'nedb'

const db = new Nedb({
  filename: 'MdDB',
  autoload: true
})
export default db
