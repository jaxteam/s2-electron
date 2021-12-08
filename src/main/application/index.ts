
import { Store } from 'redux'
import store from '../../shared/store'
import {createElectronApp} from '../electron/electron'
import '../bridge'
import { initSqlite3 } from '../dbsdk/sqlite3'
import path from 'path'
import { App } from 'electron'
import { execultSql } from '../dbsdk'

export default class Application{
  store:Store
  app:App
  constructor(){
    this.initialize()
  }
  private initialize(){
    this.app = createElectronApp()
    const sqliteFile = "sqlite3://"+path.resolve(this.app.getPath('userData'),"sino.db")
    //TODO: 临时测试写入地址
    console.log("sqliteFile:",sqliteFile)
    initSqlite3("sqlite3:///Users/jaxchow/Library/Application\\ Support/SinoStudio/sino.db")
    this.configStore()
  }
  private configStore(){
    this.store= store
  }
  bootstrap(){
   
  }
}
