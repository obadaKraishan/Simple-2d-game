import React, { useRef, useEffect, useState } from 'react';

function GameCanvas() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [itemPosition, setItemPosition] = useState({ x: 200, y: 200 });
  const [obstaclePosition, setObstaclePosition] = useState({ x: 400, y: 300 });
  const [gameOver, setGameOver] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const keysPressed = useRef({});

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
    itemImg.src = process.env.PUBLIC_URL + '/assets/item.png';

    const obstacleImg = new Image();
    obstacleImg.src = process.env.PUBLIC_URL + '/assets/obstacle.png';

    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true;
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };

    const updatePlayerPosition = () => {
      let newX = playerPosition.x;
      let newY = playerPosition.y;

      if (keysPressed.current['ArrowUp']) newY -= playerSpeed;
      if (keysPressed.current['ArrowDown']) newY += playerSpeed;
      if (keysPressed.current['ArrowLeft']) newX -= playerSpeed;
      if (keysPressed.current['ArrowRight']) newX += playerSpeed;

      // Ensure the player stays within the canvas boundaries
      newX = Math.max(0, Math.min(newX, canvasWidth - 50));
      newY = Math.max(0, Math.min(newY, canvasHeight - 50));

      setPlayerPosition({ x: newX, y: newY });
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

        // Reposition item to a new random spot within the canvas bounds
        const newItemPosition = {
          x: Math.random() * (canvasWidth - 60) + 15,
          y: Math.random() * (canvasHeight - 60) + 15,
        };
        setItemPosition(newItemPosition);

        if (score + 1 >= 5) {
          setGameOver(true);
          setShowPopup(true);
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
        setShowPopup(true);
      }
    };

    const gameLoop = () => {
      if (gameOver) return;

      context.clearRect(0, 0, canvasWidth, canvasHeight);

      // Update and draw player
      updatePlayerPosition();
      context.drawImage(playerImg, playerPosition.x, playerPosition.y, 50, 50);

      // Draw item
      context.drawImage(itemImg, itemPosition.x, itemPosition.y, 30, 30);

      // Update obstacle position
      let newObstacleX = obstaclePosition.x - obstacleSpeed;
      if (newObstacleX < -50) {
        newObstacleX = canvasWidth;
      }
      setObstaclePosition((prevPos) => ({ ...prevPos, x: newObstacleX }));

      // Draw obstacle
      context.drawImage(obstacleImg, obstaclePosition.x, obstaclePosition.y, 50, 50);

      checkCollision();

      requestAnimationFrame(gameLoop);
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
  }, [playerPosition, itemPosition, obstaclePosition, score, gameOver]);

  return (
    <div>
      <h2>Score: {score}</h2>
      <canvas ref={canvasRef} width={800} height={600} />
      {showPopup && (
        <div className="popup">
          <h2>Game Over!</h2>
          <p>Your score is: {score}</p>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default GameCanvas;
