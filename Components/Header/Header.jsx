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
                <li>Fruit Log</li>
            </NavLink>
            <NavLink to='/nutritious-fruits'>
                <li>Nutritious Fruits</li>
            </NavLink>
            <NavLink to='/favorites'>
                <li>Favorites</li>
            </NavLink>
        </div>
    </nav>
  )
}

export default Header
