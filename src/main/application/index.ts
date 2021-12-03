
import { Store } from 'redux'
import store from '../../shared/store'
import {createElectronApp} from '../electron/electron'
import '../bridger'
import { initSqlite3 } from '../dbsdk/sqlite3'

export default class Application{
  store:Store
  constructor(){
    this.initialize()
  }
  private initialize(){
    initSqlite3("sqlite3://:memory")
    this.configStore()
  }
  private configStore(){
    this.store= store
  }
  bootstrap(){
    createElectronApp()
  }
}
