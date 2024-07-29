import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './Header.css'
const Header = () => {
  return (
    <nav>
        <Outlet/>
        <NavLink to='/'>
            <p>Fruits in Season</p>
        </NavLink>
        <ol className='navigation'>
            <NavLink to='/'>
                <button>Show All</button>
            </NavLink>
            <NavLink to='/nutritiousfruits'>
                <button>Nutritious Fruits</button>
            </NavLink>
            <NavLink to='/favorites'>
                <button>Favorites</button>
            </NavLink>
        </ol>
    </nav>
  )
}

export default Header
