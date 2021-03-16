const express = require('express')
const {connect} = require('./config/mongodb')
const movieRoute = require('./routes/movieRoute')
const app = express()
const port = 4001

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/movies', movieRoute)

app.get('/', (req,res)=>{
    res.send('dari get')
})

connect().then(async(database) => {
    
    app.listen(port, () => {
        console.log('run on port', port);
    })
})