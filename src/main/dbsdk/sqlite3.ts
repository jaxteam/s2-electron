import { Connection, ResultSet } from "any-db"
import { getConnectionJdbc } from "./jdbc"

let sqlite3conn: Connection = null;


/**
 * 创建连接
 * @param url 
 * @returns 
 */

function createConnection(url:string): Promise<any> {
  return getConnectionJdbc(url)
}

/**
 * 执行sql语句
 * @param sql 
 * @param args 
 * @returns 
 */
function executeSql(sql:string,args?:any[]):Promise<ResultSet>{
  return new Promise(function(resolve,reject){
    sqlite3conn.query(sql,args,function(err:Error,result:ResultSet){
      if(err) reject(err)
      resolve(result)
    })
  })
}

/**
 * 初始化sqlite URL sqlite3://:memory
 * @param url sqlite3://:memory
 * @returns 
 */

export function initSqlite3(url:string) {
  return new Promise(function (resolve, reject) {
    createConnection(url).then(function (conn: Connection) {
      sqlite3conn = conn
      const createTableStruct = `
        CREATE TABLE IF NOT EXISTS datasource(
          id int,
          name varchar(255),
          comment varchar(255),
          kind varchar(255),
          driver varchar(255),
          user varchar(255),
          password varchar(255),
          host varchar(255),
          port varchar(255),
          database varchar(255),
          chartset varchar(255),
          url varchar(255)
        )
      `
      executeSql(createTableStruct,[]).then(resolve).catch(reject)
    })
  })
}

/**
 *  添加数据源
 * @param props 
 * @returns 
 */

export function addDatasource(props: any):Promise<ResultSet> {
  return new Promise(function (resolve, reject) {
    const keys = Object.keys(props)
    const values:string[] = Object.values(props)
    const sql = `INSERT INTO datasource (${keys.join(",")})  VALUES (${keys.map((it)=>"?").join(",")});`
    executeSql(sql,values).then(resolve).catch(reject)
  })
}

export function listDatasource():Promise<ResultSet>{
  return new Promise(function(resolve,reject){
    const sql = `select * from datasource;`
    executeSql(sql).then(resolve).catch(reject)
  })
}

export function updateDatasource(props:any,id:any):Promise<ResultSet>{
  return new Promise(function(resolve,reject){
    const entryies = Object.entries(props)
    const values = Object.values(props)
    const sql = `update datasource set ${entryies.map((item:any)=> item[0]+"=?").join(",")}  where id=${id}`
    executeSql(sql,values).then(resolve).catch(reject)
  })
}

export function deleteDatasource(id:any):Promise<ResultSet>{
  return new Promise(function(resolve,reject){
    const sql ="delete from datasource where id = ?"
    executeSql(sql,id).then(resolve).catch(reject)
  })
}

