const {gql} = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = {
  typeDefs: gql`

    type Movie {
      _id: ID
      title: String
      overview: String
      popularity: Float
      poster_path: String
      tags: [String]
    }
    
    type MovieResult {
      movie: Movie
    }

    extend type Query {
      movies: [Movie]
    }
    
    input MovieInput {
      title: String
      overview: String
      popularity: Float
      poster_path: String
      tags: [String]
    }

    type successDel {
      msg: String
    }

    type successUpdate {
      msg: String
    }

    type Mutation {
      addMovie (input: MovieInput): Movie
      delMovie (_id: ID): successDel
      updateMovie (_id:ID, input: MovieInput): successUpdate
    }
  `,

  resolvers: {
    Query: {
      async movies() {
        try{
          const moviesData = await redis.get('movies:data')
          if(moviesData){
            return JSON.parse(moviesData)
          }else {
            const {data} = await axios.get('http://localhost:4001/movies')
            redis.set('movies:data', JSON.stringify(data))
            // console.log(data);
            return data
          }
          
        }catch(err){
          console.log(err);
          return err.message
        }
      }
    },
    Mutation: {
      async addMovie(parent, args, context, info){
        console.log(args);
        try {
          await redis.del('movies:data')
          const {data} = await axios.post('http://localhost:4001/movies', args.input)
          console.log('hasil post', data)
          return data
        }catch(err){
          console.log(err);
          return err.message
        }
      },
      async delMovie(parent, args, context, info){
        console.log(args);
        try {
          await redis.del('movies:data')
          const {data} = await axios.delete(`http://localhost:4001/movies/${args._id}`)
          // console.log('hasil post', data)
          return {msg: "Movie has successfully deleted"}
        }catch(err){
          console.log(err);
          return err.message
        }
      },
      async updateMovie(parent, args, context, info){
        console.log(args);
        try {
          await redis.del('movies:data')
          const {data} = await axios.put(`http://localhost:4001/movies/${args._id}`, args.input)
          console.log('hasil post', data)
          return {msg: "Movie has successfully been updated"}
        }catch(err){
          console.log(err);
          return err.message
        }
      }
    }
  }
}

  
