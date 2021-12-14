import { parseJavaError } from "./ErrorParse"

describe("parseJavaError",()=>{

    it('Syntax error',()=>{
        const  sqlerror =`Error running instance method
        java.sql.SQLException: line 1, column 17, nearby ["] has error: 
        Syntax error
            at dm.jdbc.dbaccess.DBError.throwSQLException(DBError.java:44)
            at dm.jdbc.dbaccess.Request_Response.resp_checkErr(Request_Response.java:2570)
            at dm.jdbc.dbaccess.Request_Response.resp_prepare(Request_Response.java:711)
            at dm.jdbc.dbaccess.DmdbCSI.prepareSQL(DmdbCSI.java:224)
            at dm.jdbc.driver.DmdbStatement_bs.directExec(DmdbStatement_bs.java:1738)
            at dm.jdbc.driver.DmdbPreparedStatement_bs.initialize(DmdbPreparedStatement_bs.java:257)
            at dm.jdbc.driver.DmdbPreparedStatement_bs.<init>(DmdbPreparedStatement_bs.java:174)
            at dm.jdbc.driver.DmdbConnection_bs.prepareStatement(DmdbConnection_bs.java:1907)
            at dm.jdbc.driver.DmdbConnection_bs.prepareStatement(DmdbConnection_bs.java:680)
            at dm.jdbc.driver.DmdbConnection.do_prepareStatement(DmdbConnection.java:1681)
            at dm.jdbc.filter.FilterChain.Connection_prepareStatement(FilterChain.java:536)
            at dm.jdbc.driver.DmdbConnection.prepareStatement(DmdbConnection.java:196)
            at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
            at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
            at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
            at java.base/java.lang.reflect.Method.invoke(Method.java:566)`
        console.log(parseJavaError(sqlerror))
    })

    it('Invalid table or view name error',()=>{
        const sqlerror = `Error running instance method
        java.sql.SQLException: Error in line: 1
        Invalid table or view name [D1DD]
            at dm.jdbc.dbaccess.DBError.throwSQLException(DBError.java:44)
            at dm.jdbc.dbaccess.Request_Response.resp_checkErr(Request_Response.java:2570)
            at dm.jdbc.dbaccess.Request_Response.resp_prepare(Request_Response.java:711)
            at dm.jdbc.dbaccess.DmdbCSI.prepareSQL(DmdbCSI.java:224)
            at dm.jdbc.driver.DmdbStatement_bs.directExec(DmdbStatement_bs.java:1738)
            at dm.jdbc.driver.DmdbPreparedStatement_bs.initialize(DmdbPreparedStatement_bs.java:257)
            at dm.jdbc.driver.DmdbPreparedStatement_bs.<init>(DmdbPreparedStatement_bs.java:174)
            at dm.jdbc.driver.DmdbConnection_bs.prepareStatement(DmdbConnection_bs.java:1907)
            at dm.jdbc.driver.DmdbConnection_bs.prepareStatement(DmdbConnection_bs.java:680)
            at dm.jdbc.driver.DmdbConnection.do_prepareStatement(DmdbConnection.java:1681)
            at dm.jdbc.filter.FilterChain.Connection_prepareStatement(FilterChain.java:536)
            at dm.jdbc.driver.DmdbConnection.prepareStatement(DmdbConnection.java:196)
            at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
            at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
            at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
            at java.base/java.lang.reflect.Method.invoke(Method.java:566)`

        console.log(parseJavaError(sqlerror))
    })

    it('Invalid schema name error',()=>{
        const sqlerror = `Error running instance method
        java.sql.SQLException: Error in line: 1
        Invalid schema name [SYS1DBA]
            at dm.jdbc.dbaccess.DBError.throwSQLException(DBError.java:44)
            at dm.jdbc.dbaccess.Request_Response.resp_checkErr(Request_Response.java:2570)
            at dm.jdbc.dbaccess.Request_Response.resp_prepare(Request_Response.java:711)
            at dm.jdbc.dbaccess.DmdbCSI.prepareSQL(DmdbCSI.java:224)
            at dm.jdbc.driver.DmdbStatement_bs.directExec(DmdbStatement_bs.java:1738)
            at dm.jdbc.driver.DmdbPreparedStatement_bs.initialize(DmdbPreparedStatement_bs.java:257)
            at dm.jdbc.driver.DmdbPreparedStatement_bs.<init>(DmdbPreparedStatement_bs.java:174)
            at dm.jdbc.driver.DmdbConnection_bs.prepareStatement(DmdbConnection_bs.java:1907)
            at dm.jdbc.driver.DmdbConnection_bs.prepareStatement(DmdbConnection_bs.java:680)
            at dm.jdbc.driver.DmdbConnection.do_prepareStatement(DmdbConnection.java:1681)
            at dm.jdbc.filter.FilterChain.Connection_prepareStatement(FilterChain.java:536)
            at dm.jdbc.driver.DmdbConnection.prepareStatement(DmdbConnection.java:196)
            at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
            at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
            at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
            at java.base/java.lang.reflect.Method.invoke(Method.java:566)`

        console.log(parseJavaError(sqlerror))
    })
})