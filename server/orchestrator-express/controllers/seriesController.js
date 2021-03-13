const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class SeriesController{
  static async find(req,res) {
    try{
      const seriesData = await redis.get('series:data')
      if(seriesData){
        
        res.status(200).json(JSON.parse(seriesData))
      }else{
        
        axios
        .get('http://localhost:4002/series')
        .then((response) => {
          redis.set('series:data', JSON.stringify(response.data))
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
      
      await redis.del('series:data')
      const response = await axios({
        url:'http://localhost:4002/series',
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
      await redis.del('series:data')
      const response = await axios({
        url:`http://localhost:4002/series/${req.params.id}`,
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
      await redis.del('series:data')

      const response = await axios({
        url:`http://localhost:4002/series/${req.params.id}`,
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

module.exports = SeriesController