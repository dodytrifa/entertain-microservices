const Series = require('../models/series')

class SeriesController {
  static async find(req,res) {
    try {
        const series = await Series.find()
        res.json(series)

    }catch (err){
        console.log(err);
    }
  }

  static async create(req,res){
    try {
      const series = await Series.create(req.body)
      res.json(series.ops[0])
    }catch(err) {
      console.log(err);
    }
  }

  static async update(req,res){
    const _id = req.params.id
    const {title, overview, popularity, poster_path, tags } = req.body
    try {
      const series = await Series.update(_id, {title, overview, popularity, poster_path, tags})
      res.json(series)
    }catch(err) {
      console.log(err);
    }
  }

  static async delete(req,res){
    const _id = req.params.id
    
    try {
      const series = await Series.delete(_id)
      res.json(series)
    }catch(err) {
      console.log(err);
    }
  }

}

module.exports = SeriesController