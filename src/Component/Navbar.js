import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='webNavbar'>
      <div className="navLinksContainer">
        <NavLink className='navItem' to={'/'}> Home</NavLink>
        <NavLink className='navItem'  to={`products/mobile`}>Phone</NavLink>
        <NavLink className='navItem'  to={`products/laptop`}>Computer</NavLink>
        <NavLink className='navItem' to={`products/camera`}> Camera</NavLink>
        <NavLink className='navItem' to={`products/headphone`}> Headphone</NavLink>
      </div>
    </nav>
  )
}
export default Navbar;
