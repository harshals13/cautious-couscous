var app = require('./server.js');
var config = require('./config/config');

/*
 * Start node server
 */
app.listen(config.port);
app.timeout = 1000;
console.log("Server started on " + config.port);