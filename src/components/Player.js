import React from 'react';

function Player({ playerPosition }) {
  return (
    <img
      src={process.env.PUBLIC_URL + '/assets/player.png'}
      alt="Player"
      style={{
        position: 'absolute',
        left: playerPosition.x,
        top: playerPosition.y,
        width: 50,
        height: 50,
      }}
    />
  );
}

export default Player;
