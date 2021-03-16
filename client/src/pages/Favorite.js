import React from 'react'
import { useReactiveVar } from '@apollo/client';
import { favoritesVar } from '../config/vars';

function Favorite() {
  const favorites = useReactiveVar(favoritesVar)

  return (
    <>
    <br></br>
    <h1>Your Favorite Movies</h1>
    <div className='m-3 row row-cols-xl-5 row-cols-md-3 row-cols-sm-2'>
      {
        favorites.map(favorite => (
          <div className='col mb-2' key={favorite._id}>
              <div className="card">
                <div className="card-header">{favorite.title}</div>
                  <div className="card-body">
                  <img src={ favorite.poster_path } alt={ favorite.title }></img>
                    <h5 className="m-5 card-title">{favorite.title}</h5>
                      <p class="card-text">{favorite.overview}</p>
                  </div>
              </div>    
            </div>
        ))}
      </div>
    </>
  )   
}

export default Favorite