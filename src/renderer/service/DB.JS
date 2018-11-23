import when from 'when'

const storage = require('electron-json-storage')
const os = require('os')

storage.setDataPath(os.homedir() + '/.ReadMe-client')

class DB {
  set (key, options) {
    var deferred = when.defer()
    storage.set(key, options, err => {
      if (err) {
        console.log(err)
        deferred.reject(err)
      } else {
        deferred.resolve()
      }
    })
    return deferred.promise
  }

  get (key) {
    var deferred = when.defer()
    storage.get(key, (err, data) => {
      if (err) {
        deferred.reject(err)
      } else {
        deferred.resolve(data)
      }
    })
    return deferred.promise
  }
}

export default new DB()
