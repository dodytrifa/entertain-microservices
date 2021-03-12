const {gql} = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = {
  typeDefs: gql`
   
    type Series {
      _id: ID
      title: String
      overview: String
      popularity: Float
      poster_path: String
      tags: [String]
    }
  
    extend type Query {
      series: [Series]
    }

    type SeriesResult {
      series: Series
    }

    input SeriesInput {
      title: String
      overview: String
      popularity: Float
      poster_path: String
      tags: [String] 
    }

    type successDelSeries {
      msg: String
    }

    type successUpdateSeries {
      msg: String
    }

    extend type Mutation {
      addSeries (input: SeriesInput): Series
      delSeries (_id: ID): successDelSeries
      updateSeries (_id:ID, input: SeriesInput): successUpdateSeries
    } 
  `,

  resolvers: {
    Query: {
      async series() {
        try{
          const seriesData = await redis.get('series:data')
          if(seriesData) {
            return JSON.parse(seriesData)
          }else {
            const {data} = await axios.get('http://localhost:4002/series')
            redis.set('series:data', JSON.stringify(data))
            return data
          }
        }catch(err){
          console.log(err);
          return err.message
        }
      }
    },
    Mutation: {
      async addSeries(parent, args, context, info){
        console.log(args);
        try {
          await redis.del('series:data')
          const {data} = await axios.post('http://localhost:4002/series', args.input)
          // console.log('hasil post', data)
          return data
        }catch(err){
          console.log(err);
          return err.message
        }
      },
      async delSeries(parent, args, context, info){
        console.log(args);
        try {
          await redis.del('series:data')
          const {data} = await axios.delete(`http://localhost:4002/series/${args._id}`)
          // console.log('hasil post', data)
          return {msg: "Series has successfully deleted"}
        }catch(err){
          console.log(err);
          return err.message
        }
      },
      async updateSeries(parent, args, context, info){
        console.log(args);
        try {
          await redis.del('series:data')
          const {data} = await axios.put(`http://localhost:4002/series/${args._id}`, args.input)
          // console.log('hasil post', data)
          return {msg: "Series has successfully been updated"}
        }catch(err){
          console.log(err);
          return err.message
        }
      }
    }
  }
}


