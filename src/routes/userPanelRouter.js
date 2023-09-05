const express = require('express');
const router = express.Router();
const userPanelControllers = require('../controllers/userPanelControllers');

router.get('/', userPanelControllers.index);

module.exports = router