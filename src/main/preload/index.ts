import { contextBridge, ipcRenderer, shell, IpcRendererEvent } from 'electron'

declare global {
  interface Window {
    api: {
      invoke: (channel: string, args?: any[]) => void
      send: (channel: string, args?: any[]) => void
      on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => void
      once: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => void
      removeListener: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => void
      removeAllListeners: (channel: string) => void
    }
    shell: {
      openExternal: (url: string) => Promise<void>
    }
  }
}

contextBridge.exposeInMainWorld('api', {
  invoke: (channel: string, args: any[]): void => {
    ipcRenderer.invoke(channel, args)
  },
  send: (channel: string, args: any[]): void => {
    ipcRenderer.send(channel, args)
  },
  on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): void => {
    ipcRenderer.on(channel, listener)
  },
  once: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): void => {
    ipcRenderer.once(channel, listener)
  },
  removeListener: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): void => {
    ipcRenderer.removeListener(channel, listener)
  },
  removeAllListeners: (channel: string): void => {
    ipcRenderer.removeAllListeners(channel)
  }
})

contextBridge.exposeInMainWorld('shell', {
  openExternal: (url: string): Promise<void> => shell.openExternal(url)
})
