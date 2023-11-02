const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');

//const headerMiddleware = require('sessionUser');

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "Secreto" }));
//app.use(headerMiddleware);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const indexRoutes = require('./routes/indexRouter');
const userRoutes = require('./routes/userRouter');
const productRoutes = require('./routes/productsRouter');

app.use('/', indexRoutes);
app.use('/usuario', userRoutes);
app.use('/producto', productRoutes);



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