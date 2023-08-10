const express = require('express');
const app = express();
const mainRoutes = require('./routes/mainRoutes');

const path = require('path');

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', mainRoutes);

app.listen(3030, () => {
    console.log('Servidor corriendo en el puerto 3030');
});
