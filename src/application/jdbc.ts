
import { Connection, createConnection } from 'any-db';
//@ts-ignore
import * as  anyDBJDBC from 'any-db-jdbc'
//@ts-ignore
import ResultSet from 'jdbc/lib/resultset';


export interface DriverConfig {
  libpath: string
  url: string
  user: string
  password?: string
  drivername: string
  minpoolsize?: number
  maxpoolsize?: number
  properties: any
}

/**
 * 注册数据源类型驱动信息
 * @param config DriverConfig
 */

export function registerDriver(config: DriverConfig) {
  anyDBJDBC.registerConfig(config)
  console.log(anyDBJDBC)
}

/**
 * 获取连接metadata信息
 * @param {*} connection 
 * @returns Promise
 */

export function getMetadata(connection: any) {
  return new Promise(function (resolve, reject) {
    const conn = connection.connection
    // const metadata = conn.getMetaDataSync()
    // resolve(metadata)
    conn.getMetaData(function (err: Error, metadata: any) {
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

export function getMetadataSync(connection: any) {
  const conn = connection.connection
  return conn.getMetaDataSync()
}

/**
 * 创建新连接信息
 * @param {*} anyDb 
 * @param {*} url 
 * @returns Promise
 */

export function getConnection(url: string) {
  return new Promise(function (resolve, reject) {
    createConnection(url, function (err: Error, connection: Connection) {
      if (err) reject(err)
      resolve(connection)
    })
  })
}


/**
 * 获取表信息
 * @param metadata 
 * @returns 
 */

export function getDatabaseInfo(metadata: any) {
  const maxConfig = {
    "getMaxTablesInSelect": metadata.getMaxTablesInSelectSync(),
    "getMaxUserNameLength": metadata.getMaxUserNameLengthSync(),
    "getMaxTableNameLength": metadata.getMaxTableNameLengthSync(),
    "getMaxStatements": metadata.getMaxStatementsSync(),
    "getMaxStatementLength": metadata.getMaxStatementLengthSync(),
    "getMaxSchemaNameLength": metadata.getMaxSchemaNameLengthSync(),
    "getMaxRowSize": metadata.getMaxRowSizeSync(),
    "getMaxProcedureNameLength": metadata.getMaxProcedureNameLengthSync(),
    "getMaxCursorNameLength": metadata.getMaxCursorNameLengthSync(),
    "getMaxConnections": metadata.getMaxConnectionsSync(),
    "getMaxColumnsInTable": metadata.getMaxColumnsInTableSync(),
    "getMaxColumnsInSelect": metadata.getMaxColumnsInSelectSync(),
    "getMaxColumnsInOrderBy": metadata.getMaxColumnsInOrderBySync(),
    "getMaxColumnsInIndex": metadata.getMaxColumnsInIndexSync(),
    "getMaxColumnsInGroupBy": metadata.getMaxColumnsInGroupBySync(),
    "getMaxColumnNameLength": metadata.getMaxColumnNameLengthSync(),
    "getMaxCharLiteralLength": metadata.getMaxCharLiteralLengthSync(),
    "getMaxCatalogNameLength": metadata.getMaxCatalogNameLengthSync(),
    "getMaxBinaryLiteralLength": metadata.getMaxBinaryLiteralLengthSync(),
    "getJDBCMinorVersion": metadata.getJDBCMinorVersionSync(),
    "getJDBCMajorVersion": metadata.getJDBCMajorVersionSync(),
    "getExtraNameCharacters": metadata.getExtraNameCharactersSync(),
    "getDriverVersion": metadata.getDriverVersionSync(),
    "getDriverName": metadata.getDriverNameSync(),
    "getDriverMinorVersion": metadata.getDriverMinorVersionSync(),
    "getDriverMajorVersion": metadata.getDriverMajorVersionSync(),
    "getDefaultTransactionIsolation": metadata.getDefaultTransactionIsolationSync(),
    "getDatabaseProductVersion": metadata.getDatabaseProductVersionSync(),
    "getDatabaseProductName": metadata.getDatabaseProductNameSync(),
    "getDatabaseMinorVersion": metadata.getDatabaseMinorVersionSync(),
    "getDatabaseMajorVersion": metadata.getDatabaseMajorVersionSync(),
    "allTablesAreSelectable": metadata.allTablesAreSelectableSync(),
    "allProceduresAreCallable": metadata.allProceduresAreCallableSync(),
    "autoCommitFailureClosesAllResultSets": metadata.autoCommitFailureClosesAllResultSetsSync(),
    "dataDefinitionCausesTransactionCommit": metadata.dataDefinitionCausesTransactionCommitSync(),
    "dataDefinitionIgnoredInTransactions": metadata.dataDefinitionIgnoredInTransactionsSync(),
    "doesMaxRowSizeIncludeBlobs": metadata.doesMaxRowSizeIncludeBlobsSync(),
  }
  return maxConfig
}


export function resultSetToArray(err: Error, resultset: any): Promise<[]> {
  return new Promise(function (resolve, reject) {
    if (err) reject(err)
    const rs = new ResultSet(resultset)
    rs.toObjArray(function (err: Error, array: any) {
      if (err) reject(err)
      resolve(array)
    })
  })
}


export function getSchema<T>(metadata: any, catalogs: string = "", schemaPattern: string = "%"): Promise<T[]> {
  return new Promise(function (resolve, reject) {
    metadata.getSchemas(catalogs, schemaPattern, function (err: Error, resultSet: any) {
      if (err) reject(err)
      resultSetToArray(err, resultSet).then(function (array) {
        resolve(array)
      }).catch(function (err) {
        reject(err)
      })
    })
  })
}

/**
 * 获取 catalogs
 * @param metadata 
 * @returns 
 */

export function getCatalogs<T>(metadata: any): Promise<T[]> {
  return new Promise(function (resolve, reject) {
    metadata.getCatalogs(function (err: Error, resultSet: any) {
      if (err) reject(err)
      resultSetToArray(err, resultSet).then(function (array) {
        resolve(array)
      }).catch(function (err) {
        reject(err)
      })
    })
  })
}

export function getTablesSync(metadata: any, schema: string) {
  const reusltset = metadata.getTablesSync('', schema, '%', null)
  const rs = new ResultSet(reusltset)
  return rs
}

/**
 * 获取 指定表
 * @param metadata 
 * @param catalog 指定 catalog 
 * @param schemaPattern 匹配schema名称
 * @param tableNamePattern 匹配table名称
 * @param types 指定表类型
 * @returns 
 */

export function getTables<T>(metadata: any, catalog: string = '', schemaPattern: string = "%", tableNamePattern: string = "%", types: string = ""): Promise<T[]> {
  return new Promise(function (resolve, reject) {
    metadata.getTables(catalog, schemaPattern, tableNamePattern, undefined, function (err: Error, resultSet: any) {
      if (err) reject(err)
      resultSetToArray(err, resultSet).then(function (array) {
        resolve(array)
      }).catch(function (err) {
        reject(err)
      })
    })
  })
}

/**
 * 
 * @param metadata 
 * @param catalog 指定 catalog 
 * @param schemaPattern 匹配schema名称 
 * @param tableNamePattern 匹配table名称 
 * @param columnNamePattern  匹配column名称
 * @returns 
 */

export function getColumns<T>(metadata: any, catalog: string = '', schemaPattern: string = "%", tableNamePattern: string = "%", columnNamePattern: string = "%"): Promise<T[]> {
  return new Promise(function (resolve, reject) {
    metadata.getTables(catalog, schemaPattern, tableNamePattern, columnNamePattern, function (err: Error, resultSet: any) {
      if (err) reject(err)
      resultSetToArray(err, resultSet).then(function (array) {
        resolve(array)
      }).catch(function (err) {
        reject(err)
      })
    })
  })
}
