import React, { useEffect, useState } from 'react';
import { DataSourceForm } from './Form';

function App() {
    const [conn,setConn] = useState([])
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
        <DataSourceForm></DataSourceForm>
      </header>
    </div>
  );
}

export default App;
