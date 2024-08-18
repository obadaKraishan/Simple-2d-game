import React from 'react';

function Police({ x, y }) {
  return <div style={{ position: 'absolute', left: x, top: y, width: 60, height: 60, backgroundImage: `url(${process.env.PUBLIC_URL}/assets/police.png)` }} />;
}

export default Police;
