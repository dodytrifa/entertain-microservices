const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class MovieController{
  static async find(req,res) {
    try{
      const moviesData = await redis.get('movies:data')
      if(moviesData){
        
        res.status(200).json(JSON.parse(moviesData))
      }else{
        
        axios
        .get('http://localhost:4001/movies')
        .then((response) => {
          redis.set('movies:data', JSON.stringify(response.data))
          res.status(200).json(response.data)
        })
        .catch((err) =>{
          console.log(err);
        })
      }
    }catch (err){
      console.log(err);
    }
  }

  static async create(req,res) {
    const {title, overview, poster_path, popularity, tags} = req.body
    try {
      await redis.del('movies:data')
      const response = await axios({
        url:'http://localhost:4001/movies',
        method: 'POST',
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags
          }
      })
      
      res.status(200).json(response.data)
    }catch(err){
      console.log(err);
    }
  }

  static async delete(req,res) {
    try {
      await redis.del('movies:data')
      const response = await axios({
        url:`http://localhost:4001/movies/${req.params.id}`,
        method: 'DELETE',
      })
      res.status(200).json(response.data)
    }catch(err){
      console.log(err);
    }
  }
  
  static async update(req,res) {
    const {title, overview, poster_path, popularity, tags} = req.body
    try {
      await redis.del('movies:data')
      const response = await axios({
        url:`http://localhost:4001/movies/${req.params.id}`,
        method: 'PUT',
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags
          }
      })
      res.status(200).json(response.data)
    }catch(err){
      console.log(err);
      return err.message
    }
  }
}

module.exports = MovieController