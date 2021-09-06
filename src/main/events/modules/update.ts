import { ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true

// 开始检测更新
ipcMain.handle('event.update.check', (e, args) => {
  autoUpdater.checkForUpdates()
  autoUpdater.on('checking-for-update', () => {
    e.sender.send('checking-for-update_replay')
  })
  autoUpdater.on('update-available', info => {
    e.sender.send('update-available_replay', info)
  })
  autoUpdater.on('update-not-available', () => {
    e.sender.send('update-not-available_replay')
  })
})

// 开始下载更新
ipcMain.handle('event.update.download', (e, args) => {
  autoUpdater.downloadUpdate()
  autoUpdater.on('download-progress', progressObj => {
    e.sender.send('download-progress_replay', progressObj)
  })
  autoUpdater.on('update-downloaded', () => {
    e.sender.send('update-downloaded_replay')
  })
})

// 退出并安装
ipcMain.handle('event.update.install', (e, args) => {
  autoUpdater.quitAndInstall()
})
