const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const City = mongoose.model('City');
const jwtCheck = require('../utils/auth');

router.get('/', (req, res) => {
    console.log("Here");
    City.find((err, docs) => {
        if(!err) {
            res.send(docs);
        }
    })
});

module.exports = router;