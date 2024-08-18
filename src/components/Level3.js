// Level3.js
import React from 'react';
import GameCanvas from './GameCanvas';

function Level3({ onNextLevel }) {
  const obstacles = [
    { x: 300, y: 100 },
    { x: 500, y: 200 },
    { x: 700, y: 300 },
    { x: 400, y: 400 },
    { x: 600, y: 500 },
  ];
  const policeSpeed = 2; // Even faster speed for Level 3

  return (
    <GameCanvas obstacles={obstacles} policeSpeed={policeSpeed} itemTarget={15} onNextLevel={onNextLevel} />
  );
}

export default Level3;