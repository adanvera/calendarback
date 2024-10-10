const mongoose = require('mongoose');
const logger = require('../helpers/logger');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGO_URI );
        logger.info('Conexión a la base de datos exitosa');
    } catch (error) {
        logger.error('Error a la hora de inicializar BD: ', error);
        throw new Error('Error a la hora de inicializar BD');
    }
}

module.exports = {
    dbConnection
}