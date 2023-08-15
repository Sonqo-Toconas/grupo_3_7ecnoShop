const express = require('express');
const usuarios = require('../views/users/asd');

let userPanelController = {
    index: (req, res) => {
        res.render('userPanel', { 'usuarios': usuarios })
    }
};

module.exports = userPanelController;