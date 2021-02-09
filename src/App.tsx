import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/board'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'

function App() {
  return (
    <div className="App">
      <Board/>
    </div>
  );
}

export default App;
