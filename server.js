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
require("./models/user.model");
require("./models/restaurant.model")
require("./models/booking.model")

// Using Bodyparser
app.use(bodyParser.json());

// Controllers 
const cityController = require('./controllers/cityController');
const userController = require('./controllers/userController');
const restaurantController = require('./controllers/restaurantController');
const bookingController = require('./controllers/bookingController')
// API routes
app.use('/api/v1/city', cityController, (router));
app.use('/api/v1/user', userController, (router));
app.use('/api/v1/restaurant', restaurantController, (router));
app.use('/api/v1/booking', bookingController, (router));

module.exports = app;