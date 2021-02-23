import React from 'react';
import './Header.scss';
import logo from '../../logo.svg';

const Header = () => (
    <div className="header">
        <img src={logo} alt="Logo" />
        <span className="title"> Learning React </span>
    </div>
)

export default Header;