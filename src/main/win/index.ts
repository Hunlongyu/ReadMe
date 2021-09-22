import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { assign } from 'lodash-es'
import WinConfig from './config'

interface WinType {
  [type: string]: BrowserWindow
}

class Router {
  windows: WinType

  constructor () {
    this.windows = {}
  }

  // 【窗口】 最小化
  mini (name: string) {
    if (name && this.windows[name]) {
      this.windows[name].minimize()
    } else {
      const win = BrowserWindow.getFocusedWindow()
      if (win) win.minimize()
    }
  }

  // 【窗口】 最大化
  max (name: string) {
    if (name && this.windows[name]) {
      this.windows[name].isMaximized() ? this.windows[name].unmaximize() : this.windows[name].maximize()
    } else {
      const win = BrowserWindow.getFocusedWindow()
      if (win) win.isMaximized() ? win.unmaximize() : win.maximize()
    }
  }

  // 【窗口】 关闭
  close (name: string) {
    if (name && this.windows[name]) {
      this.windows[name].close()
    } else {
      const win = BrowserWindow.getFocusedWindow()
      if (win) win.close()
    }
  }

  // 【窗口】 获取单个窗口
  get (name: string) {
    if (name) {
      return this.windows[name]
    } else {
      return BrowserWindow.getFocusedWindow()
    }
  }

  // 【窗口】 获取所有窗口
  getAll () {
    return this.windows
  }

  async open (name: string, config?: BrowserWindowConstructorOptions) {
    if (this.windows[name]) {
      if (this.windows[name].isMinimized()) this.windows[name].restore()
      this.windows[name].focus()
      return false
    }

    const win = this.windows[name] = await createWindow(name, config)
    win.on('close', () => {
      win && win.hide()
      delete this.windows[name]
      win.destroy()
    })

    win.once('ready-to-show', () => {
      if (!win) return false
      win.show()
    })

    return win
  }

  // 【窗口】 关闭所有
  closeAll () {
    BrowserWindow.getAllWindows().forEach(win => {
      win.close()
    })
    process.exit(0)
  }
}

// 创建新的窗口
async function createWindow (name: string, config?: BrowserWindowConstructorOptions) {
  const _config = assign(WinConfig.default, WinConfig[name], config)
  const devPath = name === 'index' ? '' : name

  const win = new BrowserWindow(_config)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    await win.loadURL(`app://./${name}.html`)
  }

  win.on('closed', () => { win.destroy() })

  return win
}

export default new Router()
