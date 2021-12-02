import { getConnection } from "./application/jdbc"

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'dbsdk',
  {
    getConnection:getConnection,
  }
)






