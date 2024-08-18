import React, { useRef, useEffect, useState } from 'react';

function GameCanvas() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [itemPosition, setItemPosition] = useState({ x: 200, y: 200 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const playerImg = new Image();
    playerImg.src = process.env.PUBLIC_URL + '/assets/player.png';

    const itemImg = new Image();
    itemImg.src = process.env.PUBLIC_URL + '/assets/item.webp';

    const handleKeyDown = (e) => {
      if (gameOver) return;

      setPlayerPosition((pos) => {
        let newX = pos.x;
        let newY = pos.y;

        if (e.key === 'ArrowUp') newY -= 10;
        if (e.key === 'ArrowDown') newY += 10;
        if (e.key === 'ArrowLeft') newX -= 10;
        if (e.key === 'ArrowRight') newX += 10;

        // Ensure the player stays within the canvas boundaries
        newX = Math.max(0, Math.min(newX, canvasWidth - 50));
        newY = Math.max(0, Math.min(newY, canvasHeight - 50));

        return { x: newX, y: newY };
      });
    };

    const checkCollision = () => {
      if (
        playerPosition.x < itemPosition.x + 30 &&
        playerPosition.x + 50 > itemPosition.x &&
        playerPosition.y < itemPosition.y + 30 &&
        playerPosition.y + 50 > itemPosition.y
      ) {
        setScore((prevScore) => prevScore + 1);

        // Reposition the item randomly within the canvas
        setItemPosition({
          x: Math.random() * (canvasWidth - 30),
          y: Math.random() * (canvasHeight - 30),
        });

        if (score + 1 >= 10) {
          setGameOver(true);
        }
      }
    };

    const gameLoop = () => {
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      context.drawImage(playerImg, playerPosition.x, playerPosition.y, 50, 50);
      context.drawImage(itemImg, itemPosition.x, itemPosition.y, 30, 30);

      if (!gameOver) {
        checkCollision();
        requestAnimationFrame(gameLoop);
      } else {
        // Display game over message
        context.font = '48px Arial';
        context.fillStyle = 'red';
        context.textAlign = 'center';
        context.fillText('Game Over!', canvasWidth / 2, canvasHeight / 2);
      }
    };

    playerImg.onload = () => {
      window.addEventListener('keydown', handleKeyDown);
      gameLoop();
    };

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition, itemPosition, score, gameOver]);

  return (
    <div>
      <h2>Score: {score}</h2>
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
}

export default GameCanvas;
