// src/components/Item.js
import React from 'react';

function Item({ x, y }) {
  return <div style={{ position: 'absolute', left: x, top: y, width: 30, height: 30 }} />;
}

export default Item;
