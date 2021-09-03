import path from 'path'
import { BrowserWindowConstructorOptions } from 'electron'

const isDevelopment = process.env.NODE_ENV !== 'production'

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
    width: isDevelopment ? 1460 : 860,
    height: 670,
    autoHideMenuBar: true
  },
  home: {
    frame: false,
    width: isDevelopment ? 1680 : 1280,
    height: 860
  }
}

export default config
