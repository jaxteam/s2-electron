
import { Connection, createConnection } from "any-db";
import * as dbsdk from "./dbsdk"
import { getConnection } from "./dbsdk";
import { addConnection, initSqlite3 } from "./dbsdk/sqlite3";
import "./dbsdk/jdbc"

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'dbsdk',
  {
    getConnection:dbsdk.getConnection,
    metadata:dbsdk.getMetadata,
    initSqlite:initSqlite3,
    addConnection:addConnection
  }
)





// createConnection("sqlite3://:memory",function(err:Error,conn:Connection){
//     console.log(err,conn)
//     // conn.query('select * from user;',[],function(err:Error,result:ResultSet){
//     //     console.log(result)
//     // })
// })

// var config = {
//   libpath: 'drivers/Dm7JdbcDriver18-7.6.0.jar',
//   drivername: 'dm.jdbc.driver.DmDriver',
//   url: 'jdbc:dm://192.168.3.128:5237',
//   user: 'SYSAUDITOR',
//   password: 'SYSAUDITOR',
//   properties: {
//     user: 'SYSAUDITOR',
//     password: 'SYSAUDITOR'
//   }
// }


// for mysql native 
// var mysqlConfig = {
//   host :    'localhost',
//   user:     'root',
//   port: 3306,
//   password: 'root',
//   database: 'mysql'
// };
// createConnection("mysql://root:mariadb@localhost:3306/mysql",function(err:Error,conn:Connection){
//   console.log(err,conn)
// })


