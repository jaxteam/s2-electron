import { ResultSet } from 'any-db';
import { dialog } from 'electron';
import call from 'electron-call';
import { execultSql, databaseOrJdbcInfo, getCatalogs, getColumns, getSchema, getTableTypes, getTables, getMaxInfo, getDatabaseOrJdbcInfo, registerDriver } from '../dbsdk'
import { DriverConfig } from '../dbsdk/jdbc';
import { addDatasource,listDatasource,deleteDatasource,updateDatasource } from '../dbsdk/sqlite3';

// sqlite3://:memory

export interface IDbsdk {
    hello(str: string): string
    registerDriver(config:DriverConfig):void
    execultSql(url: string, sql: string, params: any): Promise<ResultSet>;
    databaseOrJdbcInfo(url: string): Promise<ResultSet>;
    getCatalogs(url: string, catalogs: string):Promise<ResultSet>;
    getSchema(url:string, catalogs: string , schemaPattern: string):Promise<ResultSet>
    getTables(url: string, catalog: string, schemaPattern: string , tableNamePattern: string , types: string ):Promise<ResultSet>
    getColumns(url: string, catalog: string, schemaPattern: string , tableNamePattern: string , columnNamePattern: string ):Promise<ResultSet>
    getTableTypes(url:string):Promise<ResultSet>
    getMaxInfo(url:string):any
    getDatabaseOrJdbcInfo(url:string):any
    addDatasource(props: any):Promise<ResultSet>;
    listDatasource():Promise<ResultSet>
    deleteDatasource(id:string):Promise<ResultSet>
    editDatasource(params:any,id:string):Promise<ResultSet>
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
    getDatabaseOrJdbcInfo,
    addDatasource,
    listDatasource,
    updateDatasource,
    deleteDatasource
});