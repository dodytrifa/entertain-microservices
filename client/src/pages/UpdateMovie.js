import React, {useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom' 
import { useQuery, gql,useMutation } from '@apollo/client';

const UPDATE_MOVIE = gql`
mutation updatingMovie($idMovie: ID!, $input: MovieInput) {
  updateMovie(id: $idMovie, input: $input) {
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

function UpdateMovie() {
  const [updatingMovie, {data: newMovie}] = useMutation(UPDATE_MOVIE)
  const { loading, error, data } = useQuery(GET_ALL) 

  const history = useHistory()
  const {state} = useLocation()

  const [editForm, setEditForm] = useState({
    title: state.title,
    overview: state.overview,
    popularity: state.popularity,
    poster_path: state.poster_path,
    tags: state.tags
  })

  const changeForm = (key,value)=>{
    setEditForm({...editForm, [key]:value})
  }

  const splitInput =(value)=> {
    setEditForm({...editForm, tags: value.split(",")})
  }

  const handleUpdateMovie = (e) => {
    e.preventDefault()

    updatingMovie ({
      variables: {
        idMovie:state._id, 
        input: editForm}, 
      refetchQueries: [{query: GET_ALL }]
    })
    history.push('/')
  }

  return (
    <div className='container' style={{width:'25rem'}}>
      <h1>Update Movie</h1>
        <form>
            <div className="mb-3">
              <label className="form-label">Movie Title</label>
              <input type="text" className="form-control" aria-describedby="emailHelp" onChange={(e)=> changeForm("title", e.target.value)} value={editForm.title} />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Overview</label>
              <input type="text" className="form-control" aria-describedby="emailHelp" onChange={(e)=> changeForm("overview",e.target.value)} value={editForm.overview} />
            </div>

            <div className="mb-3">
              <label className="form-label">Popularity</label>
              <input type="text" className="form-control" onChange={(e)=> changeForm("popularity", Number(e.target.value))} value={editForm.popularity}/>
            </div>

            <div className="mb-3">
              <label className="form-label">Movie Poster</label>
              <input type="text" className="form-control" onChange={(e)=> changeForm("poster_path",e.target.value)} value={editForm.poster_path}/>
            </div>

            <div className="mb-3">
              <label className="form-label">Tags</label>
              <input type="text" className="form-control" onChange={(e)=> splitInput(e.target.value)} value={editForm.tags}/>
            </div>
            <button className="btn btn-primary" onClick={handleUpdateMovie}>Update Movie</button>
        </form>
    </div>
  ) 
}

export default UpdateMovie