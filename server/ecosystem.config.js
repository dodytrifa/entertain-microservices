module.exports = {
    apps: [
      {
        name: 'movies',
        script: './services/movies/app.js'
      }, {
        name: 'series',
        script: './services/series/app.js'
      },
      {
        name: 'orchestrator',
        script: './orchestrator/app.js'
      }
    ]
  };