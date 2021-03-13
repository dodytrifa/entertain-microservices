const express = require('express')
const app = express()
const movieRoute = require('./routes/movieRoute')
const seriesRoute = require('./routes/seriesRoute')
const entertainRoute = require('./routes/entertainRoute')
const port = 4000

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/entertainme', entertainRoute)
app.use('/movies', movieRoute)
app.use('/series', seriesRoute)


app.listen(port,() => {
    console.log('run on port', port);
})