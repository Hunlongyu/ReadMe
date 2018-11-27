import DB from '../db'

const db = new DB()
const connect = db.init()
const MDLink = connect.MDLink

export default {
  ensureIndex (db, field) {
    db.ensureIndex({ fieldName: field, unique: true }, (err) => {
      if (err) {}
    })
  },
  fetchMDLinks (cb) {
    return MDLink.find({}, (err, docs) => {
      if (err) {}
      return cb(docs)
    })
  },
  addMDLink (data, cb) {
    this.ensureIndex(MDLink, 'url')
    return MDLink.insert(data, (err, docs) => {
      if (err) {}
      return cb(docs)
    })
  },
  deleteMDLink (id) {
    MDLink.remove({ id: id }, {}, (err, numRemoved) => {
      if (err) {}
    })
  },
  markMDLinkCat (id, type) {
    MDLink.update({ _id: id }, { $set: { cat: type } }, (err, num) => {
      if (err) {}
    })
  }
}
