const { csrfSync } = require("csrf-sync");






    const { csrfSynchronisedProtection } = csrfSync({
        getTokenFromRequest: (req) => {
          return req.body["CSRFToken"];
        }, // Used to retrieve the token submitted by the user in a form
      });
    
     



  module.exports = csrfSynchronisedProtection;