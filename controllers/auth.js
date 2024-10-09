

const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const logger = require('../helpers/logger');
const { generarJWT } = require('../helpers/tokens');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    logger.info('Inicio de la función -> login()')

    try {
        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            logger.error(`El usuario con email: ${email} no existe`)
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            logger.error(`Contraseña incorrecta para el usuario con email: ${email}`)
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        logger.info('Usuario logueado correctamente: ' + usuario.email);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            lastname: usuario.lastname,
            token,
            msg: 'login exitoso'
        });

    } catch (error) {
        logger.error('Error en la función -> login()');
        logger.error('Error: ' + error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    } finally {
        logger.info('Fin de la función -> login()')
    }
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
        const token = await generarJWT(usuario.id, usuario.name);

        logger.info('Usuario creado correctamente: ' + usuario);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            lastname: usuario.lastname,
            token
        })

    } catch (error) {
        logger.error('Error en la función -> createUser()');
        logger.error('Error: ' + error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    } finally {
        logger.info('Fin de la función -> createUser()')
    }
}

const renewToken = async (req, res = response) => {
    const { uid, name } = req;
    logger.info('Inicio de la función -> renewToken()')
    try {
        // Generar un nuevo JWT y retornarlo en la respuesta
        const token = await generarJWT(uid, name);
        res.json({
            ok: true,
            token
        });
    } catch (error) {
        logger.error('Error en la función -> renewToken()');
        logger.error('Error: ' + error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    } finally {
        logger.info('Fin de la función -> renewToken()')
    }
}


module.exports = {
    createUser,
    login,
    renewToken
}