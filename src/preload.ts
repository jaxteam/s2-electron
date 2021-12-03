// import * as dbsdk from "./main/dbsdk"
// import { addConnection, initSqlite3 } from "./main/dbsdk/sqlite3";

// const { contextBridge, ipcRenderer } = require('electron')

// contextBridge.exposeInMainWorld(
//   'dbsdk',
//   {
//     getConnection:dbsdk.getConnection,
//     metadata:dbsdk.getMetadata,
//     // initSqlite:initSqlite3,
//     // addConnection:addConnection
//   }
// )


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
// var mysqlConfig = {
//   host :    'localhost',
//   user:     'root',
//   port: 3306,
//   password: 'root',
//   database: 'mysql'
// };


// createConnection("sqlite3://:memory", function (err: Error, conn: Connection) {
//   console.log(err, conn)
//   const createTableStruct = `
//   CREATE TABLE IF NOT EXISTS connection(
//   id int,
//   name varchar(255),
//   host varchar(255),
//   user varchar(255),
//   password varchar(255)
//   )
//   `
//   conn.query(createTableStruct,[],function(err:Error,result:ResultSet){
//     console.log("sqlite",err,result)
//     conn.query("select * from connection",[],function(err,result:ResultSet){
//       console.log("result",result.rowCount)
//     })
//   })
// })
