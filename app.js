const config = require('./src/config/indexjs')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const methodOverride = require('method-override')
const cors = require('cors')
const app = express()
const dataConnection = require('./src/services/data-connection')
//const api = require('src/api/index')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(cors())

dataConnection();

//app.use('/', api);

app.listen(config.PORT,config.HOST,()=>{
    console.log(`app listening on http://${config.HOST}:${config.PORT}`)
})


