const jwt = require('jsonwebtoken');
const logger = require('./logger');

const generarJWT = (uid, name, lastname) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name , lastname};
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err){
                logger.error('No se pudo generar el token');
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}