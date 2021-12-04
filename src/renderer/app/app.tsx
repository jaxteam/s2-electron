import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import call from 'electron-call';
import { IDbsdk } from '../../main/bridger';
import { DataSourceForm } from './Form';


const dbsdk = call.use<IDbsdk>('dbsdk')
async function aaa(){
  console.log(await dbsdk.hello("dbsdk1"))
  await dbsdk.addConnection(["sdfs","sdfsf","sdfsf","sdfsf"])
  const rs = await dbsdk.listConnection()
  console.log("rs",rs)
}


function App() {
    // const [conn,setConn] = useState([])
    const s = useStore()
    const data = useSelector(state=>state)
    const dispatch = useDispatch()
    const handler = useCallback((type:string)=>{
      // console.log("type:",type)
      aaa()
      dispatch({type:type})
    },[])
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {data}
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
      <button onClick={()=>handler("INCREMENT")}>+</button>
      <button onClick={()=>handler("DECREMENT")}>-</button>
      <DataSourceForm></DataSourceForm>
    </div>
  );
}

export default App;
