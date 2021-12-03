import { Connection, ResultSet } from "any-db"
import { getConnection } from "."

const sqlite = require('any-db-sqlite3')

let sqlite3conn: Connection = null;

function createConnection(sqliteURL:string): Promise<any> {
  return getConnection(sqliteURL)
}

export function initSqlite3(sqliteURL:string) {
  return new Promise(function (resolve, reject) {
    createConnection(sqliteURL).then(function (conn: Connection) {
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
      conn.query(createTableStruct, [], function (err: Error, result: ResultSet) {
        if (err) reject(err)
        resolve(result)
      })
    })
  })
}



export function addConnection(args: any) {
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO connection VALUES (?,?,?,?,?);`
    sqlite3conn.query(sql, args, function (err: Error, results: ResultSet) {
      if (err) reject(err)
      resolve(results)
    })
  })
}

export function listConnection() {
  return new Promise(function (resolve, reject) {
    const sql = `select * from connection`
    sqlite3conn.query(sql, [], function (err: Error, results: ResultSet) {
      if (err) reject(err)
      resolve(results)
    })
  })
}

