import fse from 'fs-extra'
import { remote } from 'electron'
import DataStore from 'nedb'

export default class {
  constructor () {
    this.db = null
    this.dataDir = remote.app.getPath('home')
  }

  initData (db) {
    const dirName = process.env.NODE_ENV === 'development' ? '.test-dev' : 'test'
    fse.ensureDir(this.dataDir + '\\' + dirName).then(() => {
      console.log('初始化数据库文件夹')
    })

    fse.ensureFile(this.dataDir + '\\' + dirName + '\\' + db.list).then(() => {
      console.log('初始化 list 数据库')
    })

    fse.ensureFile(this.dataDir + '\\' + dirName + '\\' + db.config).then(() => {
      console.log('初始化 config 数据库')
    })

    let databse = {}
    databse.list = new DataStore({
      filename: this.dataDir + '\\' + dirName + '\\' + db.list,
      autoload: true
    })
    databse.config = new DataStore({
      filename: this.dataDir + '\\' + dirName + '\\' + db.config,
      autoload: true
    })

    return databse
  }

  init () {
    if (this.db) {
      return this.db
    }

    this.db = this.initData({
      list: 'lists.db',
      config: 'config.db'
    })

    return this.db
  }
}
