const express = require('express')
const {connect} = require('./config/mongodb')
const seriesRoute = require('./routes/seriesRoute')
const app = express()
const port = 4002

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/series', seriesRoute)

app.get('/', (req,res)=>{
    res.send('dari get')
})

connect().then(async(database) => {
    
    app.listen(port, () => {
        console.log('run on port', port);
    })
})