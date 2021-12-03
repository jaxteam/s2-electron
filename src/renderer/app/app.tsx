import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

function App() {
    // const [conn,setConn] = useState([])
    const s = useStore()
    console.log("getState",s.getState())
    const data = useSelector(state=>state)
    const dispatch = useDispatch()
    const handler = useCallback((type:string)=>{
      // console.log("type:",type)
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
    </div>
  );
}

export default App;
