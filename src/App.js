// src/App.js
import React from 'react';
import GameCanvas from './components/GameCanvas';
import './styles.css';

function App() {
  return (
    <div className="App">
      <h1>Collect the Items!</h1>
      <GameCanvas />
    </div>
  );
}

export default App;
