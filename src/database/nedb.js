import Nedb from 'nedb'

const db = new Nedb({
  filename: 'MdDB',
  autoload: true
})
// let doc = {
//   repository: 'hunlongyu/readme',
//   tag: 'hunlongyu',
//   mdUrl: 'https://hunlongyu.github.io',
//   htmlUrl: 'https://github.com/hunlongyu',
//   clickNum: 1,
//   description: 'hunlongyu is very zip'
// }
// db.insert(doc, (e, n) => {
//   console.log(e)
//   console.log(n)
// })
// db.find({}, (e, d) => {
//   console.log(d)
// })
// db.count({}, (e, c) => {
//   console.log(c)
// })
export default db
