const winston = require('winston');

// Configura el logger con colores
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(), // Añade colores
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`; // Formato del mensaje
        })
    ),
    transports: [
        new winston.transports.Console(), // Imprime los logs en la consola
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Guarda los logs de error en un archivo
        new winston.transports.File({ filename: 'combined.log' }) // Guarda todos los logs en un archivo
    ]
});

// Exporta el logger para usarlo en otras partes de tu aplicación
module.exports = logger;
