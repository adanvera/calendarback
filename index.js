const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const APP = express();

// directorio publico
APP.use(express.static('/public'));

// Rutas

// escuchar peticiones
APP.listen(PORT, () => {
    console.log('Escuchando peticiones en el puerto', PORT);
});