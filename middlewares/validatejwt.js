const { response } = require("express");
const logger = require("../helpers/logger");
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {

    logger.info('Inicio de la función -> validateJWT()')

    // Leer el token
    const token = req.header('x-token');

    if (!token) {
        logger.error('No hay token en la petición')
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        logger.info('Validando token')
        // Verificar el token
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = payload.uid;
        req.name = payload.name;
        req.lastname = payload.lastname;
        req.preferences = payload.preferences;


        console.log('payload: ', payload);
        console.log('req.uid: ', req.uid);  
        console.log('req.name: ', req.name);
        console.log('req.lastname: ', req.lastname);
        console.log('req.preferences: ', req.preferences);

        next();
    } catch (error) {
        logger.error('Error en la función -> validateJWT()');
        logger.error('Error: Token no valido : ' , error);
        res.status(500).json({
            ok: false,
            msg: 'Token no válido'
        });
    }finally{
        logger.info('Fin de la función -> validateJWT()')
    }

};

module.exports = {
    validateJWT
}