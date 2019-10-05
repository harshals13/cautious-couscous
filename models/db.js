const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myApp', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB connection Succeeded') }
    else { console.log('Error in DB connection : ' + err)}
});