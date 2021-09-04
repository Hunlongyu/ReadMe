import { ipcMain } from 'electron'
import { Buffer } from 'buffer'

ipcMain.handle('event.tools.base64', (e, args) => {
  const txt = args[0].content
  const str = Buffer.from(txt, 'base64').toString('utf-8')
  e.sender.send('event.tools.base64_replay', str)
})