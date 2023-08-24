const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsControllers');

router.get('/', productsControllers.index);
router.delete('/:id/delete', productsControllers.delete);

module.exports = router;