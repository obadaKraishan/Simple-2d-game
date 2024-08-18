// src/components/Player.js
import React from 'react';

function Player({ x, y }) {
  return <div style={{ position: 'absolute', left: x, top: y, width: 50, height: 50 }} />;
}

export default Player;
