import React, { useState } from 'react';
import Level1 from './components/Level1';
import Level2 from './components/Level2';
import Level3 from './components/Level3';

function App() {
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3); // Initialize lives
  const [gameFinished, setGameFinished] = useState(false);

  const handleNextLevel = () => {
    if (level < 3) {
      setLevel(level + 1);
    } else {
      setGameFinished(true);
    }
  };

  return (
    <div className="App">
      <h1>2D Game</h1>
      {gameFinished ? (
        <div className="popup">
          <h2>Congratulations!</h2>
          <p>You have completed all levels!</p>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      ) : (
        <>
          {level === 1 && <Level1 onNextLevel={handleNextLevel} lives={lives} setLives={setLives} />}
          {level === 2 && <Level2 onNextLevel={handleNextLevel} lives={lives} setLives={setLives} />}
          {level === 3 && <Level3 onNextLevel={handleNextLevel} lives={lives} setLives={setLives} />}
        </>
      )}
    </div>
  );
}

export default App;
