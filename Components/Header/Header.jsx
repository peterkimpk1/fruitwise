import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
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
        </div>
    </nav>
  )
}

export default Header
