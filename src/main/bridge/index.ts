import { ResultSet } from 'any-db';
import { dialog } from 'electron';
import call from 'electron-call';
import { execultSql, databaseOrJdbcInfo, getCatalogs, getColumns, getSchema, getTableTypes, getTables, getMaxInfo, getDatabaseOrJdbcInfo, registerDriver } from '../dbsdk'
import { DriverConfig } from '../dbsdk/jdbc';
import { addConnection, listConnection } from '../dbsdk/sqlite3';

// sqlite3://:memory

export interface IDbsdk {
    hello(str: string): string
    registerDriver(config:DriverConfig):void
    execultSql(url: string, sql: string, params: any): Promise<ResultSet>;
    databaseOrJdbcInfo(url: string): any;
    getCatalogs(url: string, catalogs: string):any;
    getSchema(url:string, catalogs: string , schemaPattern: string):any
    getTables(url: string, catalog: string, schemaPattern: string , tableNamePattern: string , types: string ):any
    getColumns(url: string, catalog: string, schemaPattern: string , tableNamePattern: string , columnNamePattern: string ):any
    getTableTypes(url:string):any
    getMaxInfo(url:string):any
    getDatabaseOrJdbcInfo(url:string):any
}


call.provide('dbsdk', {
    async hello(str: string) {
        return `hello ${str}`
    },
    registerDriver,
    execultSql,
    getCatalogs,
    getSchema,
    getTables,
    getColumns,
    getTableTypes,
    getMaxInfo,
    getDatabaseOrJdbcInfo
});