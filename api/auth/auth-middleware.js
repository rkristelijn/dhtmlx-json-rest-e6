function authenticationMiddleware () {
  return function (req, res, next) {
    console.log('isAuthenticated:', req.isAuthenticated());
      if (req.isAuthenticated()) {
        return next()
      }
      res.send('not logged in')
      res.redirect('/auth/login')
    }
  }
  
  module.exports = authenticationMiddleware
  