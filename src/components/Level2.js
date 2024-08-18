// Level2.js
import React from 'react';
import GameCanvas from './GameCanvas';

function Level2({ onNextLevel }) {
  const obstacles = [
    { x: 300, y: 100 },
    { x: 500, y: 200 },
    { x: 700, y: 300 },
    { x: 400, y: 400 },
  ];
  const policeSpeed = 1.5; // Faster speed for Level 2

  return (
    <GameCanvas obstacles={obstacles} policeSpeed={policeSpeed} itemTarget={10} onNextLevel={onNextLevel} />
  );
}

export default Level2;