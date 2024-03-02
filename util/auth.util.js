function createUserSession(req, user, action){
    req.session.uid = user.id.toString();
    req.session.isAdmin = user.isadmin;
   
    req.session.save(action);
}


 function destoryUserAuthSession(req){
    req.session.uid = null;
   
    

   
}


module.exports = {
    createUserSession: createUserSession,
    destoryUserAuthSession: destoryUserAuthSession
}