import React from 'react';
import snake from './SnakeBlock.module.css'


function SnakeBlock(props) {
  return (
    <div  className={snake.block}>
      <div className={snake.description}>
        <p className={snake.title}>О приложении</p>
        <p className={snake.text}>{props.text}</p>
      </div>
      <div className={snake.app}>
        {props.component}
      </div>
    </div>
  );
}

export default SnakeBlock;