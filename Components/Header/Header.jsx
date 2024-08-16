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
            <NavLink to='/'>
                <li>Show All</li>
            </NavLink>
            <NavLink to='/nutritiousfruits'>
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
