function protectRoutes(req, res, next) {
    if (!res.locals.isAuth) {
      return res.render('./401');
    }
  
    if (req.path.startsWith('/admin') && !res.locals.isAdmin) {
      return res.render('./403');
    }
  
    next();  
  }
  
  module.exports = protectRoutes;