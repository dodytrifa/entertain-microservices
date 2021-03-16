import React, {useState} from 'react'
import {useHistory} from 'react-router-dom' 
import { useMutation, useQuery, gql } from '@apollo/client';

const ADD_MOVIE = gql`
mutation AddMovie($addNewMovie:MovieInput) {
  addMovie (input:$addNewMovie) {
    _id
    title
    overview
    popularity
    poster_path
    tags
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

function AddMovie() {
  const [addMovie, {data: newMovie}] = useMutation(ADD_MOVIE)
  const { loading, error, data } = useQuery(GET_ALL)
  
  const [form, setForm] = useState({
    title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    tags:[]
  })

  const changeForm = (key,value)=>{
    setForm({...form, [key]:value})
  }

  const splitInput =(value)=> {
    setForm({...form, tags: value.split(",")})
  }

  const history = useHistory()

  const addNewMovie = (e) => {
    e.preventDefault()
    
    console.log(form);
    setForm({
    title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    tags:[]
    })
    addMovie ({variables: {addNewMovie: form}, refetchQueries: [{query: GET_ALL }]}) 
    history.push('/')
  }

  return (
    
    <div className='container' style={{width:'25rem'}}>
      <h1>Add New Movie</h1>
        <form>
            <div className="mb-3">
              <label className="form-label">Movie Title</label>
              <input type="text" className="form-control" aria-describedby="emailHelp" onChange={(e)=> changeForm("title", e.target.value)} value={form.title} />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Overview</label>
              <input type="text" className="form-control" aria-describedby="emailHelp" onChange={(e)=> changeForm("overview",e.target.value)} value={form.overview} />
            </div>

            <div className="mb-3">
              <label className="form-label">Popularity</label>
              <input type="text" className="form-control" onChange={(e)=> changeForm("popularity", Number(e.target.value))} value={form.popularity}/>
            </div>

            <div className="mb-3">
              <label className="form-label">Movie Poster</label>
              <input type="text" className="form-control" onChange={(e)=> changeForm("poster_path",e.target.value)} value={form.poster_path}/>
            </div>

            <div className="mb-3">
              <label className="form-label">Tags</label>
              <input type="text" className="form-control" onChange={(e)=> splitInput(e.target.value)} value={form.tags}/>
            </div>
            <button className="btn btn-primary" onClick={addNewMovie}>Add New Movie</button>
        </form>
    </div>
  )
}

export default AddMovie