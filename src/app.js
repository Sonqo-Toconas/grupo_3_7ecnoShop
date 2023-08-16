const express = require('express');
const app = express();
const indexRoutes = require('./routes/indexRoutes');
const registerRoutes = require('./routes/registerRouter');
const loginRoutes = require('./routes/loginRouter');
const userPanelRoutes = require('./routes/userPanelRouter');
const creationRoutes = require('./routes/creationRouter');

app.use(express.static('public'));
const path = require('path')

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use('/registro', registerRoutes);
app.use('/crear', creationRoutes);
app.use('/userpanel', userPanelRoutes);

app.get('/carrito', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productCart.html'));
});
app.get('/producto', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'));
});

app.listen(3030, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3030');
});