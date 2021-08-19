import { ipcMain, shell, dialog } from 'electron'
import { OpenDialogOptions } from 'electron/main'
import win from '../../win'

ipcMain.handle('event.win.mini', (e, args) => {
  win.mini()
})

ipcMain.handle('event.win.max', (e, args) => {
  win.max()
})

ipcMain.handle('event.win.close', (e, args) => {
  win.close()
})


ipcMain.handle('event.win.openDir', (e, args) => {
  shell.showItemInFolder(args)
})

ipcMain.handle('event.win.cookies', (e, args) => {
  e.sender.session.clearStorageData()
  e.sender.send('event.win.cookies_replay')
})

ipcMain.handle('event.win.dialog', (e, args: OpenDialogOptions) => {
  const w = win.get()
  if (!w) return false
  dialog.showOpenDialog(w, args).then(res => {
    e.sender.send('event.win.dialog_replay', res)
  })
})
