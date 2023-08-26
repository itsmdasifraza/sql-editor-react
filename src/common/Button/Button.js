import React from 'react'
import './Button.css';

/** 
 * Display customized button.
 * @param {function} onClick - Stores function that will be envoked on button click.
 * @param {string} title - Stores text to be displayed on button.
 * @param {JSX.Element} icon - Stores JSX mui icon.
 * @return {JSX.Element} Mui backdrop component
 */
const Button = ({onClick, title, icon}) => {
  return (
    <button className='custom-btn' onClick={onClick}><span>{title}</span>{icon}</button>               
  )
}

export {Button};