import React from 'react';

function Item({ itemPosition }) {
  return (
    <img
      src={process.env.PUBLIC_URL + '/assets/item.png'}
      alt="Item"
      style={{
        position: 'absolute',
        left: itemPosition.x,
        top: itemPosition.y,
        width: 30,
        height: 30,
      }}
    />
  );
}

export default Item;
