import DB from '../db'

const db = new DB()
const connect = db.init()
const MDLink = connect.MDLink

// 示例
// let link = {
//   repository: 'gkajs/gka',
//   tag: 'js',
//   link: 'https://raw.githubusercontent.com/gkajs/gka/master/readme.md'
// }
// db.find('', (doc) => { console.log(doc) })
// db.add(link, function (doc) { console.log(doc) })
// db.remove('kRq36TTM15zRGesH')
// db.update('VOBPZFdV6Cm2Rve6', {link: 'https://raw.githubusercontent.com/hunlongyu/ReadMe-client/README.md'})
export default {
  removeAll () {
    MDLink.remove({}, { multi: true })
  },
  log () {},
  add (data, cb) {
    return MDLink.insert(data, (err, docs) => {
      if (err) { console.log(err) }
      return cb(docs)
    })
  },
  find (data, cb) {
    return MDLink.find(data, (err, docs) => {
      if (err) { console.log(err) }
      return cb(docs)
    })
  },
  remove (id) {
    MDLink.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err) {}
    })
  },
  update (id, data) {
    MDLink.update({ _id: id }, { $set: data }, (err, num) => {
      if (err) { console.log(err) }
    })
  }
}
