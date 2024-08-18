import React, { useRef, useEffect, useState } from 'react';

function GameCanvas() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [itemPosition, setItemPosition] = useState({ x: 200, y: 200 });
  const [obstaclePosition, setObstaclePosition] = useState({ x: 400, y: 300 });
  const [gameOver, setGameOver] = useState(false);
  const [keysPressed, setKeysPressed] = useState({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const playerSpeed = 3;
    const obstacleSpeed = 2;

    const playerImg = new Image();
    playerImg.src = process.env.PUBLIC_URL + '/assets/player.png';

    const itemImg = new Image();
    itemImg.src = process.env.PUBLIC_URL + '/assets/item.webp';

    const obstacleImg = new Image();
    obstacleImg.src = process.env.PUBLIC_URL + '/assets/obstacle.png';

    const handleKeyDown = (e) => {
      setKeysPressed((keys) => ({ ...keys, [e.key]: true }));
    };

    const handleKeyUp = (e) => {
      setKeysPressed((keys) => ({ ...keys, [e.key]: false }));
    };

    const updatePlayerPosition = () => {
      setPlayerPosition((pos) => {
        let newX = pos.x;
        let newY = pos.y;

        if (keysPressed['ArrowUp']) newY -= playerSpeed;
        if (keysPressed['ArrowDown']) newY += playerSpeed;
        if (keysPressed['ArrowLeft']) newX -= playerSpeed;
        if (keysPressed['ArrowRight']) newX += playerSpeed;

        // Ensure the player stays within the canvas boundaries
        newX = Math.max(0, Math.min(newX, canvasWidth - 50));
        newY = Math.max(0, Math.min(newY, canvasHeight - 50));

        return { x: newX, y: newY };
      });
    };

    const checkCollision = () => {
      // Check collision with item
      if (
        playerPosition.x < itemPosition.x + 30 &&
        playerPosition.x + 50 > itemPosition.x &&
        playerPosition.y < itemPosition.y + 30 &&
        playerPosition.y + 50 > itemPosition.y
      ) {
        setScore((prevScore) => prevScore + 1);
        setItemPosition({
          x: Math.random() * (canvasWidth - 30),
          y: Math.random() * (canvasHeight - 30),
        });

        if (score + 1 >= 10) {
          setGameOver(true);
        }
      }

      // Check collision with obstacle
      if (
        playerPosition.x < obstaclePosition.x + 50 &&
        playerPosition.x + 50 > obstaclePosition.x &&
        playerPosition.y < obstaclePosition.y + 50 &&
        playerPosition.y + 50 > obstaclePosition.y
      ) {
        setGameOver(true);
      }
    };

    const gameLoop = () => {
      updatePlayerPosition();

      context.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw player
      context.drawImage(playerImg, playerPosition.x, playerPosition.y, 50, 50);

      // Draw item
      context.drawImage(itemImg, itemPosition.x, itemPosition.y, 30, 30);

      // Update obstacle position and draw obstacle
      setObstaclePosition((pos) => {
        let newX = pos.x - obstacleSpeed;
        if (newX < -50) newX = canvasWidth; // Reset position if off-screen
        return { ...pos, x: newX };
      });
      context.drawImage(obstacleImg, obstaclePosition.x, obstaclePosition.y, 50, 50);

      checkCollision();

      if (!gameOver) {
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
      window.addEventListener('keyup', handleKeyUp);
      gameLoop();
    };

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playerPosition, itemPosition, obstaclePosition, score, gameOver, keysPressed]);

  return (
    <div>
      <h2>Score: {score}</h2>
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
}

export default GameCanvas;
