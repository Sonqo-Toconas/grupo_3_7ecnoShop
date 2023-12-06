const express = require('express')
const isLoggedIn = (req, res, next) => {
    const cookieLogin = req.cookies.cookieLogin;
    const user = req.session.userLogin;
  if (cookieLogin || user) {
    next();
  }else {
    res.redirect('/usuario/login');
  }
};

module.exports = isLoggedIn