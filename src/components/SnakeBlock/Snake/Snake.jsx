import React, {useState, useRef, useEffect } from 'react';
import snakeStyles from './Snake.module.css'
import { useInterval } from './useInterval';
import {  CANVAS_SIZE,
          SNAKE_EYES,
          SNAKE_START,
          APPLE_START,
          SCALE,
          SPEED,
          DIRECTIONS
    } from './constants'
    import arrows from '../../../img/instruct.svg'
    import gameOverImg from '../../../img/GameOver.svg'

function Snake(props) {

  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [eyes, setEyes] = useState(SNAKE_EYES);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [instruction, setInstruction] = useState(true)

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };


  const moveSnake = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);

  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] + 0.5 / SCALE)) + 0.5);

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = newSnake => {
    if (newSnake[0][0] === apple[0] - 0.5 && newSnake[0][1] === apple[1] - 0.5) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const eyesCopy = JSON.parse(JSON.stringify(eyes));

    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    const newSnakeEyes = [eyesCopy[0][0]+ dir[0], eyesCopy[0][1] + dir[1]];
    
    eyesCopy.splice(0,2)
    snakeCopy.unshift(newSnakeHead);
    eyesCopy.unshift(newSnakeEyes);
    
    
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
    setEyes(eyesCopy)
  };

  const startGame = () => {
    setEyes(SNAKE_EYES);
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([1, 0]);
    setSpeed(SPEED);
    setGameOver(false);
    setInstruction(false);
  };

  useEffect(() => {
    
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let buf = 1
    for(let i = 0; i < 24; i++){
      context.beginPath();
      context.lineWidth = 0.004;
            context.moveTo(buf, 0);
            context.lineTo(buf, CANVAS_SIZE[1]);
            context.strokeStyle = '#ffffff'
            context.stroke();
            buf +=1;
    }
    buf = 1
    for(let i = 0; i < 24; i++){
      context.beginPath();
      context.lineWidth = 0.004;
            context.moveTo(0, buf);
            context.lineTo( CANVAS_SIZE[0], buf);
            context.strokeStyle = '#ffffff'
            context.stroke();
            buf +=1;
    }

    

    context.fillStyle = "white";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));


    context.beginPath()
    context.fillStyle = "black";
    eyes.forEach(([i, j]) => context.fillRect(i, j, 0.18, 0.18));


    context.beginPath()
    context.fillStyle = "white ";
    context.arc(apple[0], apple[1], 0.45, 0, 2 * Math.PI, true)
    // context.moveTo(10,9)
    context.fill()
  }, [snake, apple, gameOver, eyes]);


  return (
    <div  onClick={startGame}
        className={snakeStyles.block}
        role='button'
        tabIndex='0'
        onKeyDown={e => moveSnake(e)}>
      <canvas 
      onClick={startGame}
          className={snakeStyles.canvas}
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
          >
      </canvas>
      {gameOver && 
      <div  className={snakeStyles.gameOverBlock}>
        <div className={snakeStyles.gameOver}>
          <img src={gameOverImg} alt="game over" />
          <p className={snakeStyles.game_text}>Конец игры</p>
        </div>
        <div className={snakeStyles.button}>
          <div  className={snakeStyles.btn}>Начать заново</div>
        </div>
      </div>}
      
      {instruction && <div className={snakeStyles.instruction}>
        <img className={snakeStyles.img} src={arrows} alt="arrows" />
        <p className={snakeStyles.text}>Для управления используйте стрелки на клавиатуре</p>
      </div>}
    </div>
  );
}

export default Snake;