
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
    // console.log("sqlite3://"+path.resolve(this.app.getPath('userData'),"sino.db"))
    //TODO: 临时测试写入地址
    initSqlite3("sqlite3:///tmp/sino.db")
    this.configStore()
  }
  private configStore(){
    this.store= store
  }
  bootstrap(){
   
  }
}
