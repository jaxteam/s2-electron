import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import call from 'electron-call';
import { IDbsdk } from '../../main/bridge';
import { DataSourceForm } from './Form';
import { RootState } from '../../shared/store';
import {increment,decrement} from '../../shared/slice/counterSlice'


const dbsdk = call.use<IDbsdk>('dbsdk')
async function aaa(){
  console.log(await dbsdk.hello("dbsdk1"))
}


function App() {
    // const [conn,setConn] = useState([])
    const data = useSelector((state:RootState)=>state.counter.value)
    const dispatch = useDispatch()
    const handler = useCallback((type:string)=>{
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
      <button onClick={()=>dispatch(increment())}>+</button>
      <button onClick={()=>dispatch(decrement())}>-</button>
      <DataSourceForm></DataSourceForm>
    </div>
  );
}

export default App;
