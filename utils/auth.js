// Authorization
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-4egkal9i.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://localhost:8080/api/v1/auth',
    issuer: 'https://dev-4egkal9i.auth0.com/',
    algorithms: ['RS256']
});

//app.use(jwtCheck);

module.exports = jwtCheck;

