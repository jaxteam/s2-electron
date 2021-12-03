import { Connection, ResultSet, createConnection as createConnect } from "any-db"

let sqlite3conn: Connection = null;

export function getConnection(url: string) {
  return new Promise(function (resolve, reject) {
    createConnect(url, function (err: Error, connection: Connection) {
      if (err) reject(err)
      resolve(connection)
    })
  })
}

function createConnection(): Promise<any> {
  return getConnection('sqlite3://:memory')
}

function executeSql(sql: string, args?: []): Promise<ResultSet> {
  return new Promise(function (resolve, reject) {
    sqlite3conn.query(sql, args, function (err: Error, result: ResultSet) {
      if (err) reject(err)
      resolve(result)
    })
  })
}

export function initSqlite3() {
  return new Promise(function (resolve, reject) {
    createConnection().then(function (conn: Connection) {
      sqlite3conn = conn
      const createTableStruct = `
        CREATE TABLE IF NOT EXISTS connection(
        id int,
        name varchar(255),
        host varchar(255),
        user varchar(255),
        password varchar(255)
        )
      `
      executeSql(createTableStruct, []).then(resolve).catch(reject)
    })
  })
}



export function addConnection(args: any): Promise<ResultSet> {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO connection VALUES (?,?,?,?,?);`
    executeSql(sql, args).then(resolve).catch(reject)
  })
}

export function listConnection(): Promise<ResultSet> {
  return new Promise(function (resolve, reject) {
    const sql = `select * from connection;`
    executeSql(sql).then(resolve).catch(reject)
  })
}

