const express = require('express')
const isLoggedIn = async (req, res, next) => {
    const cookieLogin = req.cookies.cookieLogin;
    const user = req.session.userLogin;
  if (cookieLogin || user) {
    //obtenemos el id dependiendo de como se logueo
    if (req.cookies.cookieLogin) {
        [password,id] = req.cookies.cookieLogin.split('id')
    }else if (req.session.userLogin ) {
        [password,id] = req.session.userLogin.split('id')
    }
    // si el id del usuario es el 23 es el superAdmin
    if (id == 23) {
      req.session.superAdmin = true
    }
    next();
  }else {
    res.redirect('/usuario/login');
  }
};

module.exports = isLoggedIn