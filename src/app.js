const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "Secreto" }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const indexRoutes = require('./routes/indexRouter');
const creationRoutes = require('./routes/creationRouter');
const productRoutes = require('./routes/productsRouter');
const productCartRoutes = require('./routes/productCartRouter');
const productEditionRoutes = require('./routes/productEditionRouter');

const userRoutes = require('./routes/userRouter');

app.use('/', indexRoutes);
app.use('/crear', creationRoutes);
app.use('/carrito', productCartRoutes);
app.use('/producto', productRoutes);
app.use('/editar', productEditionRoutes);
app.use('/usuario', userRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
app.listen(3030, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3030');
});