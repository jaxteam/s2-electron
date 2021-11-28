import React, { useEffect, useState } from 'react';

function App() {
    const [conn,setConn] = useState([])
    useEffect(function(){
      // //@ts-ignore
      //   window.dbsdk.initSqlite().then(function(result){
      //       console.log("result",result)
      //       //@ts-ignore
      //       window.dbsdk.addConnection(["mysql","127.0.0.1","root","root"]).then(function(result){
      //           console.log(result)
      //           setConn(result)
      //       }).catch(function(err:Error){
      //           console.log("err:",err)
      //       })
      //   })  
    },[])
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
