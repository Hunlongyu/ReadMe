import os from 'os'
import DataStore from 'electron-json-storage'

const dirName = process.env.NODE_ENV === 'development' ? '\\.readme-dev' : '\\readme'
DataStore.setDataPath(os.homedir() + dirName)

class DB {
  log () {
    console.log('this is db log')
  }

  getConfig () {
    return this.find('config')
  }

  setConfig (data) {
    return DataStore.set('config', data, err => {
      if (err) { console.log(err) }
    })
  }

  add (data) {
    return DataStore.set('list', data, err => {
      if (err) { console.log(err) }
    })
  }

  check (data) {
    return DataStore.has('list', data, (err, doc) => {
      if (err) { console.log(err) }
      return doc
    })
  }

  find (data) {
    return DataStore.get('list', data, (err, doc) => {
      if (err) { console.log(err) }
      return doc
    })
  }

  findAll () {
    return DataStore.getAll((err, doc) => {
      if (err) { console.log(err) }
      return doc
    })
  }

  findMany (data) {
    return DataStore.getMany('list', data, (err, doc) => {
      if (err) { console.log(err) }
      return doc
    })
  }
}

export default new DB()
