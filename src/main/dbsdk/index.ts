import { configConsumerProps } from 'antd/lib/config-provider'
import { Connection } from 'any-db'
import path from 'path'
import { parseJavaError } from './ErrorParse'
import { DriverConfig, getCatalogsJdbc, getColumnsJdbc, getConnectionJdbc, getDatabaseOrJdbcInfoJdbc, getMaxInfoJdbc, getMetadataJdbc, getSchemaJdbc, getTablesJdbc, getTableTypesJdbc, queryJdbc, registerDriverJdbc } from './jdbc'

let drivers:any ={}
//@ts-ignore
if(process.env.WEBPACK_SERVE===true){
     drivers={
        'dm':path.resolve(__dirname, '../../drivers/Dm7JdbcDriver18-7.6.0.jar'),
        'mysql':path.resolve(__dirname, '../../drivers/mysql-connector-java-8.0.26.jar'),
        'oracle':path.resolve(__dirname, '../../drivers/ojdbc8.jar'),
    }
}else{
     drivers={
        'dm':path.resolve(__dirname, './drivers/Dm7JdbcDriver18-7.6.0.jar'),
        'mysql':path.resolve(__dirname, './drivers/mysql-connector-java-8.0.26.jar'),
        'oracle':path.resolve(__dirname, './drivers/ojdbc8.jar'),
    }
}


export async function registerDriver(config: DriverConfig) {
    // console.log("drivers:",drivers[config.kind],config)
    return registerDriverJdbc(Object.assign({}, config, {
        libpath: drivers[config.kind],
    }))
}

export async function execultSql(url: string, sql: string, params: any) {
    const conn = await getConnectionJdbc(url)
    const executeTime = new Date().getTime()
    return new Promise(function (resolve, reject) {
        queryJdbc(conn, sql, params).then(function (result) {
            resolve(Object.assign(result, {
                executeResult: {
                    status:'success',
                    executeStart: executeTime,
                    executeEnd: new Date().getTime(),
                    sql: sql,
                    affectedRows: result.affectedRows || result.rowCount
                }
            }))
        }).catch(function(err:Error){
            resolve({
                executeResult: {
                    status:'fail',
                    executeStart: executeTime,
                    executeEnd: new Date().getTime(),
                    sql: sql,
                    message:parseJavaError(err.message),
                } 
            })
        })
    })
}

export async function databaseOrJdbcInfo(url: string) {
    const conn = await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getDatabaseOrJdbcInfoJdbc(metadata)
}

export async function getCatalogs(url: string, catalogs: string = "") {
    const conn = await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getCatalogsJdbc(metadata)
}

export async function getSchema(url: string, catalogs: string = "", schemaPattern: string = "%") {
    const conn = await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getSchemaJdbc(metadata, catalogs, schemaPattern)
}

export async function getTables(url: string, catalog: string = '', schemaPattern: string = "%", tableNamePattern: string = "%", types: string = "") {
    const conn = await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getTablesJdbc(metadata, catalog, schemaPattern, tableNamePattern, types)
}

export async function getColumns(url: string, catalog: string = '', schemaPattern: string = "%", tableNamePattern: string = "%", columnNamePattern: string = "%") {
    const conn = await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getColumnsJdbc(metadata, catalog, schemaPattern, tableNamePattern, columnNamePattern)
}

export async function getTableTypes(url: string) {
    const conn = await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getTableTypesJdbc(metadata)
}


export async function getMaxInfo(url: string) {
    const conn = await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getMaxInfoJdbc(metadata)
}


export async function getDatabaseOrJdbcInfo(url: string) {
    const conn = await getConnectionJdbc(url)
    const metadata = await getMetadataJdbc(conn)
    return getDatabaseOrJdbcInfoJdbc(metadata)
}
