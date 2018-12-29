import DB from './initDB'

const db = new DB()
const connect = db.init()
const link = connect.link
const set = connect.set

export default {
  getSet (cb) {
    return set.find({}, (err, docs) => {
      if (err) { console.log(err) }
      return cb(docs)
    })
  },
  updateSet (id, data) {
    set.update({ _id: id }, { $set: data }, (err, num) => {
      if (err) { console.log(err) }
    })
  },
  clearLink () {
    link.remove({}, { multi: true })
  },
  add (data, cb) {
    return link.insert(data, (err, docs) => {
      if (err) { console.log(err) }
      return cb(docs)
    })
  },
  find (data, cb) {
    return link.find(data, (err, docs) => {
      if (err) { console.log(err) }
      return cb(docs)
    })
  },
  remove (id) {
    link.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err) {}
    })
  },
  update (id, data) {
    link.update({ _id: id }, { $set: data }, (err, num) => {
      if (err) { console.log(err) }
    })
  },
  log () { console.log('load db') },
  test () {
    let t = {
      one: 'one',
      two: 'two'
    }
    set.insert(t, (err, docs) => {
      if (err) { console.log(err) }
      console.log(docs)
    })
  }
}
