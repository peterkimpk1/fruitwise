import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './Header.css'
const Header = () => {
  return (
    <nav>
        <Outlet/>
        <NavLink to='/'>
            <li>FruitWise</li>
        </NavLink>
        <ul className='navigation'>
            <NavLink to='/'>
                <li>Show All</li>
            </NavLink>
            <NavLink to='/nutritiousfruits'>
                <li>Nutritious Fruits</li>
            </NavLink>
            <NavLink to='/favorites'>
                <li>Favorites</li>
            </NavLink>
        </ul>
    </nav>
  )
}

export default Header
