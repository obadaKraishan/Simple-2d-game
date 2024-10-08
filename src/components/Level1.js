import React from 'react';
import GameCanvas from './GameCanvas';

function Level1({ onNextLevel, lives, setLives }) {
  const obstacles = [
    { x: 300, y: 100 },
    { x: 500, y: 200 },
  ];
  const policeSpeed = 1; // Slow speed for Level 1

  return (
    <GameCanvas 
      obstacles={obstacles} 
      policeSpeed={policeSpeed} 
      itemTarget={5} 
      onNextLevel={onNextLevel} 
      lives={lives} 
      setLives={setLives} 
    />
  );
}

export default Level1;
