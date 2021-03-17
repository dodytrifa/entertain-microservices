import React from 'react'
import { useQuery, gql } from '@apollo/client';
import {useHistory} from 'react-router-dom'
import MovieList from '../components/movieList'

const GET_ALL = gql`
  query getAll {
    movies {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
    series {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`;

function Home(props) {
  const history = useHistory()
  const { loading, error, data } = useQuery(GET_ALL) 
  

  const addMovie = () => {
    history.push('/addmovie')
  }
  
  return (
    <>
    <br></br>
    <h1>Entertainme web app</h1>
    <br></br>
    <h2>Movies</h2>
    
    <br></br>
      <div className='m-3 row row-cols-xl-5 row-cols-md-3 row-cols-sm-2'>
        { data &&
          data.movies.map(movie => {
              return (
              <MovieList movie={movie}/>
              ) 
          })}
      </div>
    <h2>Series</h2>
    <br></br>
      <div className='m-3 row row-cols-xl-5 row-cols-md-3 row-cols-sm-2'>
          { data &&
          data.series.map(series => {
              return (
              <div className='col mb-2' key={series._id}>
                <div className="card">
                  <div className="card-header">{series.title}</div>
                    <div className="card-body">
                    <img src={ series.poster_path } alt={ series.title }></img>
                      <h5 className="m-5 card-title">{series.title}</h5>
                        <p class="card-text">{series.overview}</p>
                        <p class="card-text">Popularity: {series.popularity}</p>
                    </div>
                </div>    
              </div>
              ) 
          })}
      </div>
    </>
  )   
}

export default Home