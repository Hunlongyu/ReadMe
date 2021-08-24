import path from 'path'
import { BrowserWindowConstructorOptions } from 'electron'

interface BWConfig {
  [type: string]: BrowserWindowConstructorOptions
}


const config: BWConfig = {
  default: {
    webPreferences: {
      webSecurity: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false
    }
  },
  login: {
    frame: true,
    width: (860 + 600),
    height: 670,
    autoHideMenuBar: true
  },
  home: {
    frame: false,
    width: 1680,
    height: 820
  }
}

export default config
