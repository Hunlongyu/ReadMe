import { BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'

class Router {
  // 【窗口】 最小化
  mini () {
    const win = BrowserWindow.getFocusedWindow()
    if (win) win.minimize()
  }

  // 【窗口】 最大化
  max () {
    const win = BrowserWindow.getFocusedWindow()
    if (win) win.isMaximized() ? win.unmaximize() : win.maximize()
  }

  // 【窗口】 关闭
  close () {
    const win = BrowserWindow.getFocusedWindow()
    if (win) win.close()
  }

  // 【窗口】 获取单个窗口
  get () {
    return BrowserWindow.getFocusedWindow()
  }

  open () {
    createWindow()
  }
}

// 创建新的窗口
async function createWindow () {
  const win = new BrowserWindow({
    width: 1680,
    height: 820,
    frame: false,
    webPreferences: {
      webSecurity: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false
    }
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }
}

export default new Router()
