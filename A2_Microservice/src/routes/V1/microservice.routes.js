const { Router } = require('express')
const controllers = require('../../controllers')

//ROUTES
const client_query = Router();

client_query.post('/client_query', controllers.client_query)




const app_microservice = Router()
app_microservice.use('/service', client_query)


module.exports = app_microservice
