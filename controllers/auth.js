

const { response } = require('express');
const { validarCampos } = require('../middlewares/validatos');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const logger = require('../helpers/logger');
const { log } = require('winston');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    validarCampos
    res.json({
        ok: true,
        msg: 'login'
    });
};


/**
 * @description Función para crear un usuario 
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async (req, res = response) => {

    const { email, password } = req.body;
    logger.info('Inicio de la función -> createUser()')

    try {

        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            logger.error(`El usuario con email: ${email} ya existe`)
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar JWT
        //const token = await generarJWT( usuario.id, usuario.name );

        logger.info('Usuario creado correctamente: ' + usuario);
        logger.info('Fin de la función -> createUser()')

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            //token
        })

    } catch (error) {
        logger.error('Error en la función -> createUser()');
        logger.error('Error: ' + error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const renewToken = async (req, res = response) => {
    const { uid, name } = req;
    res.json({
        ok: true,
        msg: 'renewToken'
    });
}


module.exports = {
    createUser,
    login,
    renewToken
}