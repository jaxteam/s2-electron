import { Connection,createConnection } from "any-db"
// const ResultSet = require("jdbc/lib/resultset")
/**
 * 获取连接metadata信息
 * @param {*} connection 
 * @returns Promise
 */

export function getMetadata(connection:any) {
  return new Promise(function (resolve, reject) {
    const conn = connection.connection
    conn.getMetaData(function (err:Error, metadata:any) {
      if (err) reject(err)
      resolve(metadata)
    })
  })
}

/**
 * 同步方法获取metadata
 * @param {*} connection 
 * @returns metadata
 */

export function getMetadataSync(connection:any){
    const conn = connection.connection
    return conn.getMetaDataSync()
}

/**
 * 创建新连接信息
 * @param {*} anyDb 
 * @param {*} url 
 * @returns Promise
 */

export function getConnection(url:string) {
  return new Promise(function (resolve, reject) {
    createConnection(url, function (err:Error,connection:Connection) {
      if (err) reject(err)
      resolve(connection)
    })
  })
}

export function getDatabaseInfo(metadata:any){
  const maxConfig={
    "getMaxTablesInSelect":metadata.getMaxTablesInSelectSync(),
    "getMaxUserNameLength":metadata.getMaxUserNameLengthSync(),
    "getMaxTableNameLength":metadata.getMaxTableNameLengthSync(),
    "getMaxStatements":metadata.getMaxStatementsSync(),
    "getMaxStatementLength":metadata.getMaxStatementLengthSync(),
    "getMaxSchemaNameLength":metadata.getMaxSchemaNameLengthSync(),
    "getMaxRowSize":metadata.getMaxRowSizeSync(),
    "getMaxProcedureNameLength":metadata.getMaxProcedureNameLengthSync(),
    "getMaxCursorNameLength":metadata.getMaxCursorNameLengthSync(),
    "getMaxConnections":metadata.getMaxConnectionsSync(),
    "getMaxColumnsInTable":metadata.getMaxColumnsInTableSync(),
    "getMaxColumnsInSelect":metadata.getMaxColumnsInSelectSync(),
    "getMaxColumnsInOrderBy":metadata.getMaxColumnsInOrderBySync(),
    "getMaxColumnsInIndex":metadata.getMaxColumnsInIndexSync(),
    "getMaxColumnsInGroupBy":metadata.getMaxColumnsInGroupBySync(),
    "getMaxColumnNameLength":metadata.getMaxColumnNameLengthSync(),
    "getMaxCharLiteralLength":metadata.getMaxCharLiteralLengthSync(),
    "getMaxCatalogNameLength":metadata.getMaxCatalogNameLengthSync(),
    "getMaxBinaryLiteralLength":metadata.getMaxBinaryLiteralLengthSync(),
    "getJDBCMinorVersion":metadata.getJDBCMinorVersionSync(),
    "getJDBCMajorVersion":metadata.getJDBCMajorVersionSync(),
    "getExtraNameCharacters":metadata.getExtraNameCharactersSync(),
    "getDriverVersion":metadata.getDriverVersionSync(),
    "getDriverName":metadata.getDriverNameSync(),
    "getDriverMinorVersion":metadata.getDriverMinorVersionSync(),
    "getDriverMajorVersion":metadata.getDriverMajorVersionSync(),
    "getDefaultTransactionIsolation":metadata.getDefaultTransactionIsolationSync(),
    "getDatabaseProductVersion":metadata.getDatabaseProductVersionSync(),
    "getDatabaseProductName":metadata.getDatabaseProductNameSync(),
    "getDatabaseMinorVersion":metadata.getDatabaseMinorVersionSync(),
    "getDatabaseMajorVersion":metadata.getDatabaseMajorVersionSync(),
    "allTablesAreSelectable":metadata.allTablesAreSelectableSync(),
    "allProceduresAreCallable":metadata.allProceduresAreCallableSync(),
    "autoCommitFailureClosesAllResultSets":metadata.autoCommitFailureClosesAllResultSetsSync(),
    "dataDefinitionCausesTransactionCommit":metadata.dataDefinitionCausesTransactionCommitSync(),
    "dataDefinitionIgnoredInTransactions":metadata.dataDefinitionIgnoredInTransactionsSync(),
    "doesMaxRowSizeIncludeBlobs":metadata.doesMaxRowSizeIncludeBlobsSync(),
  }
  return maxConfig
}


export function hello(str:string){
  return `hello ${str} !`
}

// export function resultSetToArray(err:Error, resultset:any) {
//   return new Promise(function (resolve, reject) {
//     if (err) reject(err)
//     const rs = new ResultSet(resultset)
//     rs.toObjArray(function (err:Error, array:any) {
//       if (err) reject(err)
//       resolve(array)
//     })
//   })
// }

// export function getSchema(metadata:any) {
//   return new Promise(function (resolve, reject) {
//     metadata.getSchemas(function (err:Error, resultSet:any) {
//       if (err) reject(err)
//       resultSetToArray(err, resultSet).then(function (array) {
//         resolve(array)
//       }).catch(function (err) {
//         reject(err)
//       })
//       // const rs= new ResultSet(resultSet)
//       // rs.toObjArray(function(err,array){
//       //   if(err) reject(err)
//       //   resolve(array)
//       // })
//     })
//   })
// }

// export function getCatalogs(metadata:any) {
//   return new Promise(function (resolve, reject) {
//     metadata.getCatalogs(function (err:Error, resultSet:any) {
//       if (err) reject(err)
//       resultSetToArray(err, resultSet).then(function (array) {
//         resolve(array)
//       }).catch(function (err) {
//         reject(err)
//       })
//     })
//   })
// }

// export function getTablesSync(metadata:any,schema:string){
//   const reusltset =  metadata.getTablesSync('',schema,'%',null)
//   const rs = new ResultSet(reusltset)
//   return rs
// }


// export function getTables(metadata:any,schema:string){
//   return new Promise(function(resolve,reject){
//     // console.log(metadata.getTablesSync('',schema,'%',null))
//     metadata.getTables('',schema,'%',null,function (err:Error, resultSet:any) {
//       if (err) reject(err)
//       resultSetToArray(err, resultSet).then(function (array) {
//         resolve(array)
//       }).catch(function (err) {
//         reject(err)
//       })
//     }) 
//   })
// }
