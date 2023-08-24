import React from 'react'
import logo from '../../assets/atlan_logo.jpeg';
import './Header.css';

/**
 * Generate a header JSX component with a title and optional subtitle.
 * @returns {JSX.Element} The JSX header component.
 */

function Header() {
  return (
    <header className="header">
        <img className="header__logo" src={logo} alt="logo"/>
        <h3 className="header__title">SQL EDITOR</h3>
    </header>
  )
}

export { Header };