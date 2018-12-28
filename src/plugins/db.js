import DB from './initDB'

const db = new DB()
const connect = db.init()
const Link = connect.Link
const Config = connect.Config

export default {
  getConfig (data, cb) {
    return Config.find(data, (err, docs) => {
      if (err) { console.log(err) }
      return cb(docs)
    })
  },
  updateConfig (id, data) {
    Config.update({ _id: id }, { $set: dat }, (err, num) => {
      if (err) { console.log(err) }
    })
  },
  clearLink () {
    Link.remove({}, { multi: true })
  },
  add (data, cb) {
    return Link.insert(data, (err, docs) => {
      if (err) { console.log(err) }
      return cb(docs)
    })
  },
  find (data, cb) {
    return Link.find(data, (err, docs) => {
      if (err) { console.log(err) }
      return cb(docs)
    })
  },
  remove (id) {
    Link.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err) {}
    })
  },
  update (id, data) {
    Link.update({ _id: id }, { $set: data }, (err, num) => {
      if (err) { console.log(err) }
    })
  },
  log() { console.log('load db') },
  test() {
    let t = {
      one: 'one',
      two: 'two'
    }
    Config.insert(t, (err, docs) => {
      console.log(docs)
    })
  }
}