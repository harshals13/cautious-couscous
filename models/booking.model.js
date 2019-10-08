const mongoose = require('mongoose');

var bookingSchema = new mongoose.Schema({
    userEmail: {
      type: String
    },
    res_id: {
        type: String
    },
    numberOfPeople: {
      type: Number
    },
    bookingTime: {
      type: Date
    },
    isCompleted: {
      type: Boolean
    }

});

mongoose.model('Booking', bookingSchema)