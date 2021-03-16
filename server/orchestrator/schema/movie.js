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

    input idMovie {
      id:ID!
    }

    type Mutation {
      addMovie (input: MovieInput): Movie
      delMovie (idDelete: ID!): successDel
      updateMovie (id:ID!, input: MovieInput): successUpdate
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
        
        try {
          await redis.del('movies:data')
          const {data} = await axios.post('http://localhost:4001/movies', args.input)
          return data
        }catch(err){
          console.log(err);
          return err.message
        }
      },
      async delMovie(parent, args, context, info){
        try {
          await redis.del('movies:data')
          const {data} = await axios.delete(`http://localhost:4001/movies/${args.idDelete}`)
          
          return {msg: "Movie has successfully deleted"}

        }catch(err){
          console.log(err);
          return err.message
        }
      },
      async updateMovie(parent, args, context, info){
        try {
          console.log(args);
          await redis.del('movies:data')
          const {data} = await axios.put(`http://localhost:4001/movies/${args.id}`, args.input)
          
          return {msg: "Movie has successfully been updated"}
        }catch(err){
          console.log(err);
          return err.message
        }
      }
    }
  }
}

  
