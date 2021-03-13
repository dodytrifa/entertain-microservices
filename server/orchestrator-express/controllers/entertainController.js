const axios = require('axios')

class EntertainController {
  static async find(req,res){
    try {
        const moviesData = await axios.get('http://localhost:4001/movies')
        const seriesData = await axios.get('http://localhost:4002/series')
      
        res.status(200).json({
          movies: moviesData.data,
          series: seriesData.data
        }) 
    } catch (error) {
        console.log(error);
    }
  }
}

module.exports = EntertainController 
