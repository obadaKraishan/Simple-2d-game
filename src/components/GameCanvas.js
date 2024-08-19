import React, { useRef, useEffect, useState } from 'react';

function GameCanvas({ obstacles, policeSpeed, itemTarget, onNextLevel, lives, setLives }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });
  const [policePosition, setPolicePosition] = useState({ x: 700, y: 500 });
  const itemPosition = useRef({ x: 200, y: 200 });
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const keysPressed = useRef({});
  const lastCollision = useRef(0);

  const repositionItem = () => {
    let newItemPosition;
    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;
    do {
      newItemPosition = {
        x: Math.random() * (canvasWidth - 60) + 15,
        y: Math.random() * (canvasHeight - 60) + 15,
      };
    } while (obstacles.some(obstacle => (
      newItemPosition.x < obstacle.x + 50 &&
      newItemPosition.x + 30 > obstacle.x &&
      newItemPosition.y < obstacle.y + 50 &&
      newItemPosition.y + 30 > obstacle.y
    )));
    itemPosition.current = newItemPosition;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const playerSpeed = 3;

    const playerImg = new Image();
    playerImg.src = process.env.PUBLIC_URL + '/assets/player.png';

    const itemImg = new Image();
    itemImg.src = process.env.PUBLIC_URL + '/assets/item.png';

    const obstacleImg = new Image();
    obstacleImg.src = process.env.PUBLIC_URL + '/assets/obstacle.png';

    const policeImg = new Image();
    policeImg.src = process.env.PUBLIC_URL + '/assets/police.png';

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

      newX = Math.max(0, Math.min(newX, canvas.width - 50));
      newY = Math.max(0, Math.min(newY, canvas.height - 50));

      setPlayerPosition({ x: newX, y: newY });
    };

    const updatePolicePosition = () => {
      let newX = policePosition.x;
      let newY = policePosition.y;

      if (playerPosition.x > newX) newX += policeSpeed * 0.2;
      if (playerPosition.x < newX) newX -= policeSpeed * 0.2;
      if (playerPosition.y > newY) newY += policeSpeed * 0.2;
      if (playerPosition.y < newY) newY -= policeSpeed * 0.2;

      setPolicePosition({ x: newX, y: newY });
    };

    const checkCollision = () => {
      if (gameOver) return;

      const now = Date.now();
      if (now - lastCollision.current < 300) return;

      if (
        playerPosition.x < itemPosition.current.x + 30 &&
        playerPosition.x + 50 > itemPosition.current.x &&
        playerPosition.y < itemPosition.current.y + 30 &&
        playerPosition.y + 50 > itemPosition.current.y
      ) {
        setScore((prevScore) => {
          const newScore = prevScore + 1;
          if (newScore >= itemTarget) {
            setGameOver(true);
            setGameWon(true);
          } else {
            repositionItem();
          }
          return newScore;
        });

        lastCollision.current = now;
      }

      obstacles.forEach((obstacle) => {
        if (
          playerPosition.x < obstacle.x + 50 &&
          playerPosition.x + 50 > obstacle.x &&
          playerPosition.y < obstacle.y + 50 &&
          playerPosition.y + 50 > obstacle.y
        ) {
          setGameOver(true);
          setGameWon(false);
        }
      });

      if (
        playerPosition.x < policePosition.x + 50 &&
        playerPosition.x + 50 > policePosition.x &&
        playerPosition.y < policePosition.y + 50 &&
        playerPosition.y + 50 > policePosition.y
      ) {
        setGameOver(true);
        setGameWon(false);
      }
    };

    const gameLoop = () => {
      if (gameOver) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      updatePlayerPosition();
      updatePolicePosition();
      checkCollision();

      // Draw player
      context.drawImage(playerImg, playerPosition.x, playerPosition.y, 50, 50);

      // Draw police
      context.drawImage(policeImg, policePosition.x, policePosition.y, 50, 50);

      // Draw item
      context.drawImage(itemImg, itemPosition.current.x, itemPosition.current.y, 30, 30);

      // Draw obstacles
      obstacles.forEach((obstacle) => {
        context.drawImage(obstacleImg, obstacle.x, obstacle.y, 50, 50);
      });

      requestAnimationFrame(gameLoop);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playerPosition, policePosition, gameOver, gameWon, obstacles, policeSpeed, itemTarget]);

  useEffect(() => {
    if (gameOver && !gameWon) {
      if (lives > 1) {
        setLives(lives - 1);
        setGameOver(false);
        setScore(0);
        setPlayerPosition({ x: 50, y: 50 });
        setPolicePosition({ x: 700, y: 500 });
        repositionItem();
      } else {
        setLives(3);
        setGameOver(true);
      }
    }
  }, [gameOver, gameWon, lives, setLives]);

  return (
    <div>
      <h2>Score: {score}</h2>
      <h3>Lives: {lives}</h3>
      <canvas ref={canvasRef} width={800} height={600} />
      {gameOver && (
        <div className="popup">
          <h2>{gameWon ? 'You Won!' : 'Game Over!'}</h2>
          <p>Your score is: {score}</p>
          {gameWon ? (
            <button onClick={onNextLevel}>Next Level</button>
          ) : (
            <button onClick={() => window.location.reload()}>Retry</button>
          )}
        </div>
      )}
    </div>
  );
}

export default GameCanvas;
