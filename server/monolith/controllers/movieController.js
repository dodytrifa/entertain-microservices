const Movie = require('../models/movie')

class MovieController {
  static async find(req,res) {
    try {
        const movies = await Movie.find()
        res.json(movies)

    }catch (err){
        console.log(err);
    }
  }

  static async create(req,res){
    try {
      const movie = await Movie.create(req.body)
      res.json(movie.ops[0])
    }catch(err) {
      console.log(err);
    }
  }

  static async update(req,res){
    const _id = req.params.id
    const {title, overview, popularity, poster_path, tags } = req.body
    try {
      const movie = await Movie.update(_id, {title, overview, popularity, poster_path, tags})
      res.json(movie)
    }catch(err) {
      console.log(err);
    }
  }

  static async delete(req,res){
    const _id = req.params.id
    
    try {
      const movie = await Movie.delete(_id)
      res.json(movie)
    }catch(err) {
      console.log(err);
    }
  }

}

module.exports = MovieController