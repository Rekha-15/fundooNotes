/**
 * @description   : It is use to establish the connection between the database and server
 * @package       : express.
 * @file          : server.js
 * @author        : Rekha Patil
*/

//to get express, and wanted to use express in this machine also we need 'express' package
//importing express and body-parser modules
const express = require('express');
const bodyParser = require('body-parser');

//create express app
const app = express();

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended : true }))

// parse request of content-type - application/json
app.use(bodyParser.json())

//importing from database configuration to server.js and connecting to the database using mongoose.
 //Configuring the database
const dbConfig = require('./config/config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
   console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the FundooNotesApp.' });
});

// including the routes in server.js

// Require Notes routes
require('./routes/users')(app);



// listen for requests
//listen on port 5000 for incoming connects
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});

module.exports = app;