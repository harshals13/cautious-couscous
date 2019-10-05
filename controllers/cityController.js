const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const City = mongoose.model('City');

router.get('/', (req, res) => {
    console.log("Here");
    City.find((err, docs) => {
        if(!err) {
            res.send(docs);
        }
    })
});

module.exports = router;