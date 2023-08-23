const express = require('express')
const cors = require('cors')
const app = express()
const app_microservice_v1 = require('./routes/V1/microservice.routes')

app.use(cors({
    origin: ['*']
}
))
app.use(express.json())


app.use('/A2_microservice/v1', app_microservice_v1)

module.exports = app