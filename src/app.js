const express = require('express');
const app = express();

const path = require('path');

app.use(express.static('../public'));

app.listen(3030, () => {
    console.log('Servidor corriendo');
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'));
});

app.get('/carrito', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/carrito.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});

app.get('/producto', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/producto.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/registro.html'));
});