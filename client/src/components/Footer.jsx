import React from 'react';
import Logo from '../img/logo.png';

function Footer() {
  return (
    <footer>
      <img className="logo" src={Logo} alt=""></img>
      <span>
        Made using <b>React.js</b>
      </span>
    </footer>
  );
}

export default Footer;
