const express = require('express');
const { dbConnection } = require('./database/config');
const logger = require('./helpers/logger');
require('dotenv').config();
var cors = require('cors');
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// directorio publico
app.use(express.static(__dirname + '/public'));

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/evento'));

// Iniciar la conexión a la base de datos y luego escuchar peticiones
const startServer = async () => {
    try {
        logger.info('Iniciando conexión a la base de datos');
        await dbConnection();
        app.listen(PORT, () => {
            logger.info(`Servidor corriendo en puerto ${PORT}`);
        });
    } catch (error) {
        logger.error('Error al iniciar la aplicación:', error);
    }
};

startServer();