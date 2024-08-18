import React, { useState } from 'react';
import Level1 from './components/Level1';
import Level2 from './components/Level2';
import Level3 from './components/Level3';

function App() {
  const [level, setLevel] = useState(1);
  const [gameFinished, setGameFinished] = useState(false);

  const handleNextLevel = () => {
    if (level < 3) {
      setLevel(level + 1);
    } else {
      setGameFinished(true); // Show a message at the end of the game
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
          {level === 1 && <Level1 onNextLevel={handleNextLevel} />}
          {level === 2 && <Level2 onNextLevel={handleNextLevel} />}
          {level === 3 && <Level3 onNextLevel={handleNextLevel} />}
        </>
      )}
    </div>
  );
}

export default App;
