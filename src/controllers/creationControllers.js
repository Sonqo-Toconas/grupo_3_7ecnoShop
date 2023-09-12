const creationController = {
    index: (req, res) => {
        res.render('creation')
    },

    crear: (req, res) => {
        /* const { nombre, descripcion } = req.body;*/
        const imagen = req.file;
        res.send('¡El formulario se ha enviado correctamente!');
    }
};

module.exports = creationController;