import jetpack from 'fs-jetpack'
import fs from 'fs'
import Nedb from 'nedb'
import { remote } from 'electron'

export default class {
  constructor () {
    this.db = null
    this.dataDir = jetpack.cwd(remote.app.getPath('home'))
  }

  initDB (db) {
    const dirName = process.env.NODE_ENV === 'development' ? '.readMe-dev-v2' : '.readMe-v2'
    const existsDir = jetpack.exists(this.dataDir.path(dirName))
    if (!existsDir) {
      fs.mkdir(this.dataDir.path(`${dirName}`), (err) => {
        if (err) {}
      })
    }
    const existsLink = fs.existsSync(this.dataDir.path(`${dirName}/${db.link}`))
    const existsSet = fs.existsSync(this.dataDir.path(`${dirName}/${db.set}`))
    let database = {}

    if (!existsLink && !existsSet) {
      this.dataDir.write(this.dataDir.path(`${dirName}/${db.link}`), '')
      this.dataDir.write(this.dataDir.path(`${dirName}/${db.set}`), '')
    }

    database.link = new Nedb({
      filename: this.dataDir.path(`${dirName}/${db.link}`),
      autoload: true
    })
    database.set = new Nedb({
      filename: this.dataDir.path(`${dirName}/${db.set}`),
      autoload: true
    })
    return database
  }

  init () {
    if (this.db) {
      return this.db
    }

    this.db = this.initDB({
      link: 'link.db',
      set: 'set.db'
    })

    return this.db
  }
}
