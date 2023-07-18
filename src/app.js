const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('../public'));

app.listen(3030, () => {
    console.log('Servidor corriendo');
});