//@ts-ignore
import * as  anyDBJDBC from 'any-db-jdbc'

var config = {
    // Required
    libpath: '../../drivers/mysql-connector-java-8.0.26.jar',
    url: 'jdbc:mysql://localhost:3306/mysql',
    // Optional
    drivername: 'com.mysql.cj.jdbc.Driver',
    minpoolsize: 10,
    maxpoolsize: 100,
    
    properties: {
      user: "root",
      password: "mariadb",
    }
  };

anyDBJDBC.registerConfig(config)

