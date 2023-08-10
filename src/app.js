const express = require('express');
const app = express();
const mainRoutes = require('./routes/mainRoutes');
const registerRoutes = require('./routes/registerRouter');
const productCartRoutes = require('./routes/productsCartRouter');
const loginRoutes = require('./routes/loginRouter');
const productDetailRoutes = require('./routes/productsDetailRouter');

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', mainRoutes);
app.use('/carrito', productCartRoutes);
app.use('/login', loginRoutes);
app.use('/producto', productDetailRoutes);
app.use('/registro', registerRoutes);


app.listen(3030, () => {
    console.log('Servidor corriendo en el puerto 3030');
});
