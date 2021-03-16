import React from 'react'
import { useQuery, useMutation, gql } from '@apollo/client';
import {useHistory} from 'react-router-dom'
import { favoritesVar } from '../config/vars';

const DEL_MOVIE = gql`
mutation deleteMovie($idDelete: ID!) {
  delMovie(idDelete: $idDelete)
  {
    msg
  }
}
`

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

export default function MovieList ({movie}){
  const history = useHistory()
  const [deletingMovie, {data:deletedMovie}] = useMutation(DEL_MOVIE)  
  const { loading, error, data } = useQuery(GET_ALL)
  
  const updateMovie = () => {
    history.push(`/updatemovie/${movie._id}`, movie)
  }
  
  const handleDelete = (e, idMovie) => {
    e.preventDefault()
    
    deletingMovie({
      variables:{
        idDelete:  idMovie },
        refetchQueries: [{ query: GET_ALL }]
    })
  }
  const addToFavorites = (data) => {
    const {
      _id,
      title,
      overview,
      popularity,
      poster_path,
      tags
    } = data
    const existedFavorites = favoritesVar()
    const newFavorite = {
      _id,
      title,
      overview,
      popularity,
      poster_path,
      tags 
    }
    if(!existedFavorites.find(el => el._id === data._id)){
      favoritesVar([newFavorite, ...existedFavorites])
    }
    history.push('/favorite')
  }

    return (
      <div className='col mb-2' key={movie._id}>
        <div className="card">
          <div className="card-header">{movie.title}</div>
            <div className="card-body">
              <img src={ movie.poster_path } alt={ movie.title }></img>
                <h5 className="m-5 card-title">{ movie.title }</h5>
                  <p class="card-text">{movie.overview}</p>
                  <p class="card-text">Popularity: {movie.popularity}</p>
                  <p class="card-text">Tags: {movie.tags}</p>
                <button className="m-3 btn btn-secondary btn-sm rounded-pill" onClick={updateMovie}>Update Movie</button>
                <button className="m-3 btn btn-primary btn-sm rounded-pill" onClick={()=> addToFavorites(movie)}>add To Favorite </button>
                <button className="m-3 btn btn-danger btn-sm rounded-pill" onClick={(e)=> handleDelete(e, movie._id)}>Delete</button>
          </div>
        </div>    
      </div>
    )
}