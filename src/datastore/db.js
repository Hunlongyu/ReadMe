import DB from './init'

const db = new DB()
const connect = db.init()
const list = connect.list
const config = connect.config

export default {
  log () {
    console.log(1, list, config)
  },
  add (data, cb) {
    return list.insert(data, (err, docs) => {
      if (err) { console.log(err) }
      return cb(docs)
    })
  }
}

// export default {
//   log () {
//     console.log('init db')
//   },
//   removeAll () {
//     list.remove({}, { multi: true })
//     config.remove({}, { multi: true })
//   },
//   readConfig (data, cb) {
//     return config.find(data, (err, docs) => {
//       if (err) {}
//       return cb(docs)
//     })
//   },
//   writeConfig (id, data) {
//     config.update({ _id: id }, { $set: data }, (err, num) => {
//       if (err) {}
//     })
//   },
//   add (data, cb) {
//     return list.insert(data, (err, docs) => {
//       if (err) {}
//       return cb(docs)
//     })
//   },
//   find (data, cb) {
//     return list.find(data, (err, docs) => {
//       if (err) {}
//       return cb(docs)
//     })
//   },
//   remove (id) {
//     list.remove({ _id: id }, {}, (err, numRemoved) => {
//       if (err) {}
//     })
//   },
//   update (id, data) {
//     list.update({ _id: id }, { $set: data }, (err, num) => {
//       if (err) {}
//     })
//   }
// }
