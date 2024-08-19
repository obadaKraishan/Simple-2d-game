import React from 'react';

function Obstacles({ obstacles }) {
  return (
    <>
      {obstacles.map((obstacle, index) => (
        <img
          key={index}
          src={process.env.PUBLIC_URL + '/assets/obstacle.png'}
          alt="Obstacle"
          style={{
            position: 'absolute',
            left: obstacle.x,
            top: obstacle.y,
            width: 50,
            height: 50,
          }}
        />
      ))}
    </>
  );
}

export default Obstacles;
