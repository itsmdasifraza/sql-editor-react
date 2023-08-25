import React from 'react'
import './Button.css';

const Button = ({onClick, title, icon}) => {
  return (
    <button className='custom-btn' onClick={onClick}><span>{title}</span>{icon}</button>               
  )
}

export {Button};