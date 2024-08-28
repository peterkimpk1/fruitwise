import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
const Header = () => {
  return (
    <nav>
        <NavLink to='/'>
            <li>FruitWise</li>
        </NavLink>
        <div className='navigation'>
            <NavLink to='/fruit-log'>
                <li id='fruit-log-nav'>Fruit Log</li>
            </NavLink>
            <NavLink to='/nutritious-fruits'>
                <li id='nutritious-fruits-nav'>Nutritious Fruits</li>
            </NavLink>
            <NavLink to='/favorites'>
                <li id='favorites-nav'>Favorites</li>
            </NavLink>
        </div>
    </nav>
  )
}

export default Header
