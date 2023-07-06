import React from 'react';
import nav from './Navigation.module.css'
import { NavLink } from 'react-router-dom';

function Navigation(props) {
  return (
    <div4 className={nav.block}>
      <div className={nav.link} ><NavLink exact to="" className={nav.nav_link} activeClassName="active" >Змейка</NavLink></div>
      <di1 className={nav.link} ><NavLink to="/calculator" className={nav.nav_link} activeClassName="active" >Калькулятор</NavLink></di1>
      <di2 className={nav.link} ><NavLink to="/casino" className={nav.nav_link} activeClassName="active" >Казино</NavLink></di2>
      <div className={nav.link} ><NavLink to="/tictactoe" className={nav.nav_link} activeClassName={nav.active} >Крестики-нолики</NavLink></div>
    </div4>
  );
}

export default Navigation;