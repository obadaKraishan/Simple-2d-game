import React from 'react';

function Police({ policePosition }) {
  return (
    <img
      src={process.env.PUBLIC_URL + '/assets/police.png'}
      alt="Police"
      style={{
        position: 'absolute',
        left: policePosition.x,
        top: policePosition.y,
        width: 50,
        height: 50,
      }}
    />
  );
}

export default Police;
