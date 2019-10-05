const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const City = mongoose.model('City');
const jwtCheck = require('../utils/auth');
const request = require('request');
const config = require('../config/config');

const options = {
    headers: {
      'user-key': config.userKey
    }
};

router.get('/', (req, res) => {
    console.log("Here");
    City.find((err, docs) => {
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
    })
});


router.get('/:id/collections', (req, res) => {
    request.get(config.zomatoUrl + 'collections?city_id=' + req.params.id, options, function(err,response,body){
        if(err) {
            res.json({
                status: 999,
                response: err
            });
        }
        res.json({
            status: 0,
            response: JSON.parse(body)
        });
    });
});


module.exports = router;