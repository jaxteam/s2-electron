//@ts-ignore
import { Connection } from 'any-db';
//@ts-ignore
import * as  anyDBJDBC from 'any-db-jdbc'
import { DriverConfig, getCatalogs, getConnection, getMetadata, getSchema, getTables } from "../jdbc";
import { registerDriver } from "../jdbc"
import path from 'path'

describe('mysql test', () => {
  var config = {
    libpath: path.resolve(__dirname, '../../../drivers/Dm7JdbcDriver18-7.6.0.jar'),
    drivername: 'dm.jdbc.driver.DmDriver',
    url: 'jdbc:dm://192.168.3.128:5237',
    user: 'SYSAUDITOR',
    password: 'SYSAUDITOR',
    properties: {
      user: 'SYSAUDITOR',
      password: 'SYSAUDITOR'
    }
  };

  beforeAll(function () {
    registerDriver(config)
  })
  it('register', () => {
    expect(anyDBJDBC.configs['jdbcdm192.168.3.1285237']).toEqual(config)
    // expect(anyDBJDBC.configs).toHaveProperty('jdbcdm192.168.3.1285237', config)
  })

  it('connection',()=>{
    getConnection(config.url).then(function(conn:Connection){
      console.log(conn)
    })
  })
})