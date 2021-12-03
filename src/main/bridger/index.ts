import { dialog } from 'electron';
import call from 'electron-call';
import * as dbsdk from '../dbsdk'
import { addConnection, listConnection } from '../dbsdk/sqlite3';

// sqlite3://:memory

export interface IDbsdk{
    hello(str:string):string
    addConnection<T>(args:any):Promise<T>
    listConnection<T>():Promise<T>
}

  
call.provide('dbsdk',{
    async hello(str:string) {
        return dbsdk.hello(str) 
    },
    addConnection,
    listConnection
} );