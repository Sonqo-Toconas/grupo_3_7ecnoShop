const express = require('express')

const isLoggedIn = (req, res, next) => {
  const user = req.session.userLogin;
  if (!user) {
    res.redirect('/usuario/login');
  } else {
    next();
  }
};

module.exports = isLoggedIn