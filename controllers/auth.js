

const { response } = require('express');
const { validationResult } = require('express-validator');
const { validarCampos } = require('../middlewares/validatos');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    validarCampos
    res.json({
        ok: true,
        msg: 'login'
    });
};

const createUser = async (req, res = response) => {
    const { name, email, password, lastname } = req.body;
    res.status(201).json({
        ok: true,
        msg: 'register',
        name,
        email,
        password,
        lastname
    });
};

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