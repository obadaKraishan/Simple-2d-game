import React, { useRef, useEffect, useState } from 'react';

function GameCanvas() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [itemPosition, setItemPosition] = useState({ x: 200, y: 200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const playerImg = new Image();
    playerImg.src = process.env.PUBLIC_URL + '/assets/player.png';

    const itemImg = new Image();
    itemImg.src = process.env.PUBLIC_URL + '/assets/item.webp';

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') setPlayerPosition((pos) => ({ ...pos, y: pos.y - 10 }));
      if (e.key === 'ArrowDown') setPlayerPosition((pos) => ({ ...pos, y: pos.y + 10 }));
      if (e.key === 'ArrowLeft') setPlayerPosition((pos) => ({ ...pos, x: pos.x - 10 }));
      if (e.key === 'ArrowRight') setPlayerPosition((pos) => ({ ...pos, x: pos.x + 10 }));
    };

    const checkCollision = () => {
      if (
        playerPosition.x < itemPosition.x + 30 &&
        playerPosition.x + 50 > itemPosition.x &&
        playerPosition.y < itemPosition.y + 30 &&
        playerPosition.y + 50 > itemPosition.y
      ) {
        setScore(score + 1);
        setItemPosition({ x: Math.random() * 750, y: Math.random() * 550 });
      }
    };

    const gameLoop = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.drawImage(playerImg, playerPosition.x, playerPosition.y, 50, 50);
      context.drawImage(itemImg, itemPosition.x, itemPosition.y, 30, 30);

      checkCollision();

      requestAnimationFrame(gameLoop);
    };

    playerImg.onload = () => {
      window.addEventListener('keydown', handleKeyDown);
      gameLoop();
    };

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition, itemPosition, score]);

  return (
    <div>
      <h2>Score: {score}</h2>
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
}

export default GameCanvas;
