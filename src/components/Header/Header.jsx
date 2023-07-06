import React from 'react';
import header from './Header.module.css'
import reactImg from '../../img/React.svg'


function Header(props) {
  return (
    <div className={header.block}>
      <div className={header.link_block}>
        <a className={header.link} href="#">
         
          <p className={header.link_text}>© Eduard Kurbatov</p>
        </a>
      </div>
      <div className={header.logo_block}>
        <img src={reactImg} className={header.logo_img} alt="React-logo" />
        <p className={header.logo_text}>React Applications</p>
        
      </div>
    </div>
  );
}

export default Header;