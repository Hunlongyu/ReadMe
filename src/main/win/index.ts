import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import assign from 'lodash/assign'
import WinConfig from './config'

class Router {
  constructor () {
    this.window = {}
  }
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

  open (name: string, config: BrowserWindowConstructorOptions) {
    if (this.window[name]) {
      this.window[name].focus()
      return false
    }

    let win = this.window[name] = await createWindow(name, config)

    win.on('close', () => {
      win && win.hide()
      delete this.window[name]
      win = null
    })

    win.once('ready-to-show', () => {
      win.show()
    })

    return win
  }
}

// 创建新的窗口
async function createWindow (name: string, config: BrowserWindowConstructorOptions) {
  const _config = assign(WinConfig.default, WinConfig[name], config)
  const devPath = name === 'index' ? '' : name

  let win = new BrowserWindow(_config)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    await win.loadURL(`app://./${name}.html`)
  }

  win.on('closed', () => { win.destroy() })

  return win
}

export default new Router()
