import React from 'react'
import '../App.css';
import {Link} from 'react-router-dom'

function Nav() {
  return (
    <nav>
      <ul className='nav-links'>
            <li>
              <Link to="/" className='linkTo'>Home</Link>
            </li>
            <li>
              <Link to="/addmovie" className='linkTo'>Add New Movie</Link>
            </li>
            <li>
              <Link to="/favorite" className='linkTo'>Favorite</Link>
            </li>
          </ul>
    </nav>  
  )
}

export default Nav

