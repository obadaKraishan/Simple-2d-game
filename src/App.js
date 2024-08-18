import React, { useState } from 'react';
import Level1 from './components/Level1';
import Level2 from './components/Level2';
import Level3 from './components/Level3';

function App() {
  const [level, setLevel] = useState(1);

  const nextLevel = () => {
    if (level < 3) {
      setLevel(level + 1);
    } else {
      alert('Congratulations! You have completed all levels!');
    }
  };

  return (
    <div className="App">
      <h1>2D Game</h1>
      {level === 1 && <Level1 />}
      {level === 2 && <Level2 />}
      {level === 3 && <Level3 />}
      <button onClick={nextLevel}>Next Level</button>
    </div>
  );
}

export default App;
