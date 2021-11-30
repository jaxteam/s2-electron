import { app, BrowserWindow } from 'electron';
// import {jdbc,sqlite3} from '@s2/dbsdk'
// import * as anyDb from 'any-db'
import { listConnection ,getConnection} from './db';
// import {DriverConfig, getConnection as getConnect, registerDriver} from './jdbc'
import path from 'path'
// import { createConnection } from 'any-db';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export default class Application {
  constructor() {
    this.bootstrap()
    this.initLocalDatabase()
  }
  initLocalDatabase() {
    // getConnection("sqlite3://:memory").then(function(conn){
    //   // console.log(conn)
    //   // conn.open
    // })
    // // jdbc.getConnection("")
    // // sqlite3.initSqlite3()
    // console.log("init sqlite3")
    // this.mysqlConnect()
    // console.log("init mysql")
    listConnection().then(function(result){
      console.log(result)
    })
    // throw new Error('Method not implemented.');
  }
  mysqlConnect(){
    var config = {
      // libpath: path.resolve(__dirname, '../../drivers/Dm7JdbcDriver18-7.6.0.jar'),
      libpath: path.resolve(__dirname, '../../drivers/mysql-connector-java-8.0.26.jar'),
      url: 'jdbc:mysql://192.168.1.25:3306/mysql',
      // Optional
      drivername: 'com.mysql.cj.jdbc.Driver',   
      // drivername: 'dm.jdbc.driver.DmDriver',
      // url: 'jdbc:dm://192.168.3.128:5237',
      // user: "root",
      // password: "mariadb",
      properties: {
        user: "root",
        password: "mariadb",
      }
      // user: 'SYSAUDITOR',
      // password: 'SYSAUDITOR',
      // properties: {
      //   user: 'SYSAUDITOR',
      //   password: 'SYSAUDITOR'
      // }
    };
    //@ts-ignore
    registerDriver(config)
    //@ts-ignore
    // getConnection(config.url).then((conn)=>{
    //   console.log(conn)
    // })
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
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    mainWindow.webContents.openDevTools();
  }
  handlerAppEvent(){
    var self = this
    if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
      app.quit();
    }
    app.on('ready', this.createWindow);
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
    this.handlerAppEvent()
  }
}