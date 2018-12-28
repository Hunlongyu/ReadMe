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
    const dirName = process.env.NODE_ENV === 'development' ? '.ReadMe-dev-v2' : '.ReadMe-v2'
    const existsDir = jetpack.exists(this.dataDir.path(dirName))
    if (!existsDir) {
      fs.mkdir(this.dataDir.path(`${dirName}`), (err) => {
        if (err) {}
      })
    }
    const existsLink = fs.existsSync(this.dataDir.path(`${dirName}/${db.Link}`))
    const existsConfig = fs.existsSync(this.dataDir.path(`${dirName}/${db.Config}`))
    let database = {}

    if (!existsLink) {
      this.dataDir.write(this.dataDir.path(`${dirName}/${db.Link}`), '')
    }
    if (!existsConfig) {
      this.dataDir.write(this.dataDir.path(`${dirName}/${db.Config}`), '')
    }

    database.Link = new Nedb({
      filename: this.dataDir.path(`${dirName}/${db.Link}`),
      autoload: true
    })
    database.Config = new Nedb({
      filename: this.dataDir.path(`${dirName}/${db.Config}`),
      autoload: true
    })
    return database
  }

  init () {
    if (this.db) {
      return this.db
    }

    this.db = this.initDB({
      Link: 'Link.db',
      Config: 'Config.db'
    })

    return this.db
  }
}