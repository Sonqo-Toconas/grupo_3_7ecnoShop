const express = require('express');
const router = express.Router();
const registerControllers = require('../controllers/registerControllers');

router.get('/', registerControllers.index);
router.post('/crear', registerControllers.procesoCrear);

module.exports = router;