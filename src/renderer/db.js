import jetpack from 'fs-jetpack'
import fs from 'fs'
import Nedb from 'nedb'
import { remote } from 'electron'

export default class {
  constructor () {
    this.db = null
    this.dataDir = jetpack.cwd(remote.app.getPath('home'))
  }

  createOrReadDB (db) {
    const dirName = process.env.NODE_ENV === 'development' ? '.ReadMe-client-dev' : '.ReadMe-client'
    const existsDir = jetpack.exists(this.dataDir.path(dirName))
    if (!existsDir) {
      fs.mkdir(this.dataDir.path(`${dirName}`), (err) => {
        if (err) {}
      })
    }
    const existsMDLink = fs.existsSync(this.dataDir.path(`${dirName}/${db.MDLink}`))
    let database = {}

    if (!existsMDLink) {
      this.dataDir.write(this.dataDir.path(`${dirName}/${db.MDLink}`), '')
    }

    database.MDLink = new Nedb({
      filename: this.dataDir.path(`${dirName}/${db.MDLink}`),
      autoload: true
    })

    return database
  }

  init () {
    if (this.db) {
      return this.db
    }

    this.db = this.createOrReadDB({
      MDLink: 'MDLink.db'
    })

    return this.db
  }
}
