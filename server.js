var express = require('express');

var bodyParser = require('body-parser');

var app = express();

const config = require('./config/config');

var router = express.Router();

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// Connecting to database
require('./models/db')
require("./models/city.model");


// Using Bodyparser
app.use(bodyParser.json());

const cityController = require('./controllers/cityController');


// API routes
app.use('/api/v1/city', cityController, (router));


  module.exports = app;