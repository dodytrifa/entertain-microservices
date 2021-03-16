import React from 'react'
import '../App.css';
import {Link} from 'react-router-dom'

function Nav() {
  return (
    <nav>
      <ul className='nav-links'>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favorite">Favorite</Link>
            </li>
          </ul>
    </nav>  
  )
}

export default Nav

