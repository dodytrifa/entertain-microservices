const express = require('express')
const app = express()
const port = 3002

const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/movies', async (req,res) => {
  // res.send('dari get')
  try{
    const moviesData = await redis.get('movies:data')
    if(moviesData){
      console.log('dari redis');
      res.status(200).json(JSON.parse(moviesData))
    }else{
      console.log('data belum di cache');
      axios
      .get('http://localhost:5001/movies')
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

})

app.listen(port,() => {
    console.log('run on port', port);
})