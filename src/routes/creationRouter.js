const express = require('express');
const router = express.Router();
const creationControllers = require('../controllers/creationControllers');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
  
  const upload = multer({ storage: storage });
  
  router.get('/crear', (req, res) => {
    res.render('creación');
  });

  router.post('/crear', upload.single('imagen'), (req, res) => {
    console.log(req.file);
    res.send('Producto creado!');
  });
  router.get('/', creationControllers.index);

module.exports = router;