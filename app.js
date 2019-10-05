var app = require('./server.js');
var config = require('./config/config');

/*
 * Start node server
 */
app.listen(config.port);
console.log("Server started on " + config.port);