const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session')

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "Secreto" }))

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const indexRoutes = require('./routes/indexRouter');
const registerRoutes = require('./routes/registerRouter');
const loginRoutes = require('./routes/loginRouter');
const userPanelRoutes = require('./routes/userPanelRouter');
const creationRoutes = require('./routes/creationRouter');
const productRoutes = require('./routes/productsRouter');
const productCartRoutes = require('./routes/productCartRouter');
const productEditionRoutes = require('./routes/productEditionRouter');
const userRoutes = require('./routes/userRouter');

app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use('/registro', registerRoutes);
app.use('/crear', creationRoutes);
app.use('/userpanel', userPanelRoutes);
app.use('/carrito', productCartRoutes);
app.use('/producto', productRoutes);
app.use('/editar', productEditionRoutes);
app.use('/usuario', userRoutes);

app.listen(3030, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3030');
});