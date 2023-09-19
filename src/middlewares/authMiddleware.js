const isLoggedIn = (req, res, next) => {
    if (req.session.isEmpty) {
      
      res.redirect('/usuario/login');
      next()  
    }
    else{
    next()
    }
  }

  module.exports = isLoggedIn