const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const app = express();

// directorio publico
app.use(express.static('/public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));

// escuchar peticiones
app.listen(PORT, () => {
    console.log('Escuchando peticiones en el puerto', PORT);
});