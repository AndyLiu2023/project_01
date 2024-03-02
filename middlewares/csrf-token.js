const { csrfSync } = require("csrf-sync");

const {
    invalidCsrfTokenError, 
    generateToken, 
    getTokenFromRequest, 
    getTokenFromState, 
    storeTokenInState, 
    revokeToken, 
    csrfSynchronisedProtection, 
} = csrfSync();



// function addCsrfToken(req, res, next){

//     res.locals.csrfToken = req.csrfToken();
//   next();
// }

function addCsrfToken(req, res, next){
  const myRoute = generateToken(req);

  res.locals.csrfToken = myRoute;

  next();

}







module.exports =  addCsrfToken;

  





