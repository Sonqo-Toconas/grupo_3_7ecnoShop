const express = require('express');
const router = express.Router();
const userPanelController = require('../controllers/userPanelControllers');

router.get('/', userPanelController.index);

module.exports = router;