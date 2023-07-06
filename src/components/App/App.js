import React from 'react';
import app from './App.module.css';
import { BrowserRouter as Router, Switch, Route, Routes, } from 'react-router-dom'

import Header from '../Header/Header'
import Navigation from '../Navigations/Navigation';
import SnakeBlock from '../SnakeBlock/SnakeBlock';
import Snake from '../SnakeBlock/Snake/Snake'
import Calculator from '../Calculator/Calculator';
import Casino from '../Casino/Casino';
import TicTacToe from '../TicTacToe/TicTacToe'

function App(props) {
  const content = [
    {
      text: "Игра-змейка реализована с помощью React Hooks с использованием функциональных компонентов. Использование canvas в качестве игрового поля, наверно, было не лучшим решением, но тем не менее приложение работает стабильно. Gameplay реализован следущим образом: столкновение со стенкой, с самим собой или же движение в противополжном направлении приведет к концу игры. Подсчет очков не ведется. Старт происходит по нажатию на canvas. Хорошей игры!",
      component: <Snake />
    },

    {
      text: "Самый обычный калькулятор, реализованный с помощью хука useReducer. При делении на 0 выдает ошибку, но не пофиксина особенность работы JavaScript с числами. Введите 0.1 + 0.2",
      component: <Calculator />
    },
    {
      text: "Игровой автомат основан на классовых компонентах с методами жизненного цикла. Так же добавлен аудио-файл при выигрыше, поэтому не пугайтесь). Эффект прокрутки осуществлен с помощью рандомного изменения background-position с применеием разного времени для каждого лота. ",
      component: <Casino />
    },

    {
      text: "Приложение крестики-нолики, рассчитано для игры на двоих. Функция, которая бы исполняла роль второго игрока не предусмотрена. Сам движок основан на классовых компонентах с добавлением небольшой 3D-анимациии.  ",
      component: <TicTacToe />
    },

  ]
  return (
    <div className={app.wrapper} >
      <div className={app.container}>
        <Header />
        <Navigation />
        <Routes>
          <Route path='/1' element={<SnakeBlock text={content[0].text} component={content[0].component} />} />
          <Route path='/calculator' element={<SnakeBlock text={content[1].text} component={content[1].component} />} />
          <Route path='/casino' element={<SnakeBlock text={content[2].text} component={content[2].component} />} />
          <Route path='/tictactoe' element={<SnakeBlock text={content[3].text} component={content[3].component} />} />


        </Routes>
        {/* <Snake />
        <Calculator />
        <Casino />
        <TicTacToe /> */}
      </div>
    </div>
  )

}

export default App;
