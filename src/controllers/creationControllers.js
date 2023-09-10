
const crear = (req, res) => {
    const { nombre, descripcion } = req.body;
    const imagen = req.file;
  
    res.send('¡El formulario se ha enviado correctamente!');
  };
  
const creationController = {
    creation: (req, res) => {
        res.render('creation')
    }
};
module.exports = creationController;