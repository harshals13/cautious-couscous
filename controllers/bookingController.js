const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const request = require('request');
const config = require('../config/config');
const Booking = mongoose.model('Booking');

// Get bookings by user email
router.get('/', (req, res) => {
    const today = new Date();
    Booking.find({userEmail: req.query.userId, bookingDate: {$gt: today}}, function(err, docs) {
        if(!err) {
            res.json({
                status: 0,
                response: docs
            });
        } else {
            res.json({
                status: 999,
                response: err
            });
        }
    });
});

// Create a booking
router.post('/', (req, res) => {
    let booking = new Booking();

    booking.userEmail = req.body.email;
    booking.res_id = req.body.res_id;
    booking.numberOfPeople = req.body.numberOfPeople;
    booking.bookingTime = req.body.bookingTime;

    booking.save((err, doc) => {
        if(!err) {
            res.json({
                status: 0,
                response: doc
            });
        } else {
            res.json({
                status: 999,
                response: err
            });
        }
    })
});

module.exports = router;