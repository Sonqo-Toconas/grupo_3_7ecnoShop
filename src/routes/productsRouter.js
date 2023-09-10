const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsControllers');


/* router.get('/crear', productsController.mostrarFormularioCreacion);

router.get('/', productsController.mostrarProductos);
router.get('/:id', productsController.mostrarProducto);
router.post('/', productsController.crearProducto); */


router.get('/', productsControllers.index);
router.delete('/:id/delete', productsControllers.delete);
router.get('/detalle/:id', productsControllers.detalle);


module.exports = router;