//@ts-ignore
import { Connection } from 'any-db';
//@ts-ignore
import * as  anyDBJDBC from 'any-db-jdbc'
import { DriverConfig, getCatalogsJdbc, getConnectionJdbc, getMaxInfoJdbc, getMetadataJdbc, getSchemaJdbc, getTablesJdbc, getTableTypesJdbc, queryJdbc, useDatabase  } from "../jdbc";
import { registerDriverJdbc } from "../jdbc"
import path from 'path'
import { cancelSql, execultSql } from '../index';
//@ts-ignore
import DatabaseMetaData from 'jdbc/lib/databasemetadata'
//@ts-ignore
import JdbcResultSet from 'jdbc/lib/resultset'
import { compose } from 'redux';

describe('jdbc test', () => {
  // var config: DriverConfig = {
  //   libpath: path.resolve(__dirname, '../../../../drivers/Dm7JdbcDriver18-7.6.0.jar'),
  //   drivername: 'dm.jdbc.driver.DmDriver',
  //   host:"192.168.3.128",
  //   port:"5237",
  //   kind:'dm',
  //   url: 'jdbc:dm://192.168.3.128:5237/SYSDBA',
  //   user: 'SYSDBA',
  //   password: 'SYSDBA',
  //   properties: {
  //     user: 'SYSDBA',
  //     password: 'SYSDBA'
  //   }
  // };
  var config:DriverConfig = {
    libpath: path.resolve(__dirname, '../../../../drivers/mysql-connector-java-8.0.26.jar'),
    // libpath: '../drivers/mysql-connector-java-8.0.26.jar',
    drivername: 'com.mysql.cj.jdbc.Driver',
    url: 'jdbc:mysql://192.168.2.179:3306',
    kind:"dm",
    host:"192.168.2.179",
    port:"3306",
    user: 'root',
    password: 'root',
    properties: {
        user: 'root',
        password: 'root'
    }
}

  beforeAll(function(){
    registerDriverJdbc(config)
  })
  it('jdbc registerDriver111', () => {
    // console.log(anyDBJDBC.configs)
    expect(anyDBJDBC.configs).toHaveProperty("jdbcdm192.168.3.1285237", {})
  })

  it('jdbc geConnection', async () => {
    const conn = await getConnectionJdbc(config.url)
    expect(conn).toHaveProperty("config",config)
  })

  it('jdbc get Metadata',async ()=>{
    const conn = await getConnectionJdbc(config.url)
    const dbmd = await getMetadataJdbc(conn)
    expect(dbmd).toBeDefined()
  })

  it('jdbc getSchema',async function(){
    const conn = await getConnectionJdbc(config.url)
    const dbmd = await getMetadataJdbc(conn)
    const schema = await getSchemaJdbc(dbmd)
    expect(schema.length).toBe(5)
  })
  it('jdbc getSchema with params',async function(){
    const conn = await getConnectionJdbc(config.url)
    const dbmd = await getMetadataJdbc(conn)
    const schema = await getSchemaJdbc(dbmd,"","SYSDBA")
    console.log("schema",schema) 
    expect(schema.length).toBe(1)
  })

  it('jdbc get Catalogs',async function(){
    const conn = await getConnectionJdbc(config.url)
    const dbmd = await getMetadataJdbc(conn)
    const catalogs = await getCatalogsJdbc(dbmd) 
    console.log(catalogs,catalogs)
    expect(catalogs).toEqual([])
  })

  it('jdbc get Tables',async function(){
    const conn = await getConnectionJdbc(config.url)
    const dbmd = await getMetadataJdbc(conn)
    const tables = await getTablesJdbc(dbmd,'','SYSDBA','%','') 
    // console.log("tables",tables)
    expect(tables).toBeTruthy() 
  })


  it('jdbc get columns',async function() {
    const conn = await getConnectionJdbc(config.url)
    const dbmd = await getMetadataJdbc(conn)
    const columns = await getTablesJdbc(dbmd,'','SYSDBA','DDD','%')  
    expect(columns).toBeTruthy()
  })

  it('jdbc get table types',async function() {
    const conn = await getConnectionJdbc(config.url)
    const dbmd = await getMetadataJdbc(conn)
    const tableTypes = await getTableTypesJdbc(dbmd)  
    console.log("tableTypes",tableTypes)
    // expect(columns).toBeTruthy()
  })

  it("jdbc execute query promise",function(done){
    const conn = getConnectionJdbc(config.url).then((conn)=>{
      // console.log(queryJdbc(conn,'select * from dual',[])) 
      const sql = "select sleep(0.5),user from mysql.user"
      execultSql(config.url,sql,[]).then(function(result){
        console.log(result)
        done()
      }).finally(()=>done())
      setTimeout(function(){
        cancelSql(config.url,sql)
      },500)
      
    })
  })


  it("jdbc execute query err",function(done){
    const conn = getConnectionJdbc(config.url).then((conn)=>{
      queryJdbc(conn,'select * from "SYS1DBA"."D1DD"',[]).then(function(result){
        console.log(result)
        // done()
      }).catch((err:Error)=>{
        //@ts-ignore
        console.log(err.message)
      }).finally(()=>done())
    })
  })

  it('jdbc use database',function(done){
    const conn = getConnectionJdbc(config.url).then((conn)=>{
      useDatabase(conn,"SYSDBA").then(function(result){
        console.log(result)
        // done()
      }).finally(()=>done())
    })
  })


  it('dbsdk jdbc ',async function(){
    const reuslt=await execultSql("jdbc:dm://192.168.3.128:5237/SYSDBA",'select * from "SYSDBA"."DDD"',[])
    console.log("reuslt",reuslt)
    // done()
  })

  it('getTypeinfo',async function(){
    const conn = await getConnectionJdbc(config.url)
    const dbmd = await getMetadataJdbc(conn)
     const meta =new DatabaseMetaData(dbmd)
    meta.getTypeInfo(function(err:Error,rs:any){
        // console.log(rs.toObjArray)
        rs.toObjectArraySync(function(err:Error,array:[]){
          console.log(array)
        })
        // const jdbcRS = JdbcResultSet(rs)
        // console.log(jdbcRS.toObjArray)
        // console.log(jdbcRS)
        // jdbcRS.toObjArray(function(array:any){
        //     console.log(array)
        // })
    })
    // const types = await getMaxInfoJdbc(dbmd)
    // console.log("types",types.getTypeInfo) 
    // types.getTypeInfo.toObjArray(function(err:any,array:any){
    //   console.log("getTypeInfo:",array) 
    // })
    // resultSetToArray(null,types).then(function(array){
    //   console.log("array",array)
    // })
  })

  
})