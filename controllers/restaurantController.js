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

    let pageNumber = req.query.pagenumber;

    const params = {
        city_id: req.query.cityId,
        start: pageNumber*10,
        count: 10
    };
    console.log(params);

    request.get(config.zomatoUrl + `search?city_id=${params.city_id}&start=${params.start}&count=${params.count}` 
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

router.post('/favourite/:email' , (req, res) => {
  res.send("Hellow");
})

router.post('/favourite', (req, res) => {
  console.log("Setting as favourite");
    Restaurant.findOne({userId: req.query.email, "restaurant.id": req.query.res_id}, function (err, docs) {
        if (docs !== null) {
            res.json({
                status: 0,
                response: "Restaurant is already in your favourites list"
            });
        } else {
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
        }
    })
})

module.exports = router;