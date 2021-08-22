import path from 'path'

const config = {
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
    width: 680,
    height: 820
  },
  home: {
    frame: false,
    width: 1680,
    height: 820
  }
}

export default config
