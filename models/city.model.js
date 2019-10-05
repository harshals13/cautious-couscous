const mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
    city: {
        type: String
    }
});

mongoose.model('City', citySchema)