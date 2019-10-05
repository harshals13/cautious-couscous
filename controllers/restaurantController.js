const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const jwtCheck = require('../utils/auth');
const request = require('request');
const config = require('../config/config');
const Restaurant = mongoose.model('Restaurant');

const options = {
    headers: {
      'user-key': config.userKey
    }
};

router.get('/', (req, res) => {
    const params = {
        city_id: req.query.cityId,
        collection_id: req.query.collectionId,
        start: req.query.start,
        count: req.query.count
    };

    request.get(config.zomatoUrl + `search?city_id=${params.city_id}&collection_id=${params.collection_id}&start=${params.start}&count=${count}` 
                , options, function(err,response,body){
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


router.get('/:id', (req, res) => {
    request.get(config.zomatoUrl + `restaurant?res_id=${req.params.res_id}` 
                , options, function(err,response,body){
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

router.post('/favourite', (req, res) => {

    request.get(config.zomatoUrl + `restaurant?res_id=${req.query.res_id}` 
                , options, function(err,response,body){
        if(err) {
            res.json({
                status: 999,
                response: err
            });
        }
        const restaurant = new Restaurant();
        const data = {
            userId: req.query.email,
            restaurant: JSON.parse(body)
        }
        restaurant.collection.insert(data);
        res.json({
            status: 0,
            response: "Restaurant added to favourites"
        });
    });
})

module.exports = router;