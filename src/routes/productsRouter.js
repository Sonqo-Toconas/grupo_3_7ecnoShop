const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsControllers');


router.get('/crear', productsControllers.mostrarFormularioCreacion);
router.post('/crear', productsControllers.crear);

router.get('/', productsControllers.index);
router.delete('/:id/delete', productsControllers.delete);
router.get('/detalle/:id', productsControllers.detalle);


module.exports = router;