/* eslint-disable key-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
/**
 * @description   : It is use to establish the connection between the database and server
 * @package       : express.
 * @file          : server.js
 * @author        : Rekha Patil
*/

// to get express, and wanted to use express in this machine also we need 'express' package
// importing express and body-parser modules
const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('./swagger/swagger.json')

// create express app
const app = express()

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended : true }))

// parse request of content-type - application/json
app.use(bodyParser.json())

// importing from database configuration to server.js and connecting to the database using mongoose.
// Configuring the database
const dbConfig = require('./config/config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Successfully connected to the database')    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err)
  process.exit()
})

// displaying swagger explorer bar by passing true
const options = {
  explorer: true
}

// swagger ui
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc, options))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the FundooNotesApp.' })
})

// including the routes in server.js

// Require Notes routes
require('./routes/users')(app)


// listen on port 5000 for incoming connects
// listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})

module.exports = app
