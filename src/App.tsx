import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/board'
import axios from 'axios'

function App() {

  const fetch = () => {
    axios.get('http://localhost:3001/api/ping')
      .then(response => console.log(response))
  }
  return (
    <div className="App">
      <Board/>
      <button onClick={fetch}>Ping</button>
    </div>
  );
}

export default App;
