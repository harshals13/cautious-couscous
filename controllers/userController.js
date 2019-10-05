const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwtCheck = require('../utils/auth');

router.get('/', (req, res) => {
    console.log("Here");
    User.find((err, docs) => {
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

router.post('/', (req, res) => {
    registerNewUser(req, res);
});

router.post('/login', (req, res) => {
    loginUser(req, res);
});

function loginUser(req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, (err, doc) => {
        if(doc && !err) {
            res.json({
                status: 0,
                response: doc
            });
        } else {
            res.json({
                status: 401,
                response: "Credentials do not match"
            });
        }
    })
}

function registerNewUser(req, res) {
    let user = new User();
    user.name = req.body.fullName;
    user.email = req.body.email;
    user.mobile = req.body.mobile;
    user.city = req.body.city;
    user.password = req.body.password;
    user.save((err, doc) => {
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
}

module.exports = router;