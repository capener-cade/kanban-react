import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/board'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'

function App() {

  const fetch = () => {
    axios.get('http://localhost:3001/api/ping')
      .then(response => console.log(response))
  }
  return (
    <div className="App">
      <Board/>
      <Button onClick={fetch}>Ping</Button>
    </div>
  );
}

export default App;
