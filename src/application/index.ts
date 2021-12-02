import { Connection } from 'any-db';
import { app, BrowserWindow,Notification } from 'electron';
// import {DriverConfig, getConnection, registerDriver} from './jdbc'
import path from 'path'
import { getConnection, registerDriver } from './jdbc';
// import { createConnection } from 'any-db';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export default class Application {
  constructor() {
    this.mysqlConnect()
  }
  initLocalDatabase() {
    // getConnection("sqlite3://:memory").then(function(conn){
    //   // console.log(conn)
    //   // conn.open
    // })
    // // jdbc.getConnection("")
    // // sqlite3.initSqlite3()
    // console.log("init sqlite3")
    // getConnection("jdbc:dm://192.168.3.128:5237").then((conn:Connection)=>{
    //   console.log("conn:",conn)
    //   new Notification({ title: "连接成功",body:"jdbc:dm://192.168.3.128:5237"}).show()
    // }).catch(err=>{
    //   new Notification({ title: "连接失败",body:err}).show() 
    // })
  }
  mysqlConnect(){
    var config = {
      libpath: path.resolve(__dirname, '../../drivers/Dm7JdbcDriver18-7.6.0.jar'),
      drivername: 'dm.jdbc.driver.DmDriver',
      url: 'jdbc:dm://192.168.3.128:5237',
      user: 'SYSAUDITOR',
      password: 'SYSAUDITOR',
      properties: {
        user: 'SYSAUDITOR',
        password: 'SYSAUDITOR'
      }
    };
   registerDriver(config)
  }
  createWindow() {
    const mainWindow = new BrowserWindow({
      height: 600,
      width: 800,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
      }
    });
    new Notification({ title: "打开",body:"显示界面"}).show()
    console.log("initLocalDatabase");
    this.initLocalDatabase()
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    mainWindow.webContents.openDevTools();
  }
  handlerAppEvent(){
    var self = this
    if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
      app.quit();
    }
    app.on('ready', this.createWindow.bind(this));
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        self.createWindow();
      }
    });
  }

  bootstrap() {
    // Handle creating/removing shortcuts on Windows when installing/uninstalling.
    var self = this
    this.mysqlConnect()
    this.handlerAppEvent()
  }
}