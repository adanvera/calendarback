

const { response } = require('express');
const { validationResult } = require('express-validator');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    res.json({
        ok: true,
        msg: 'login'
    });
};

const createUser = async (req, res = response) => {
    const { name, email, password, lastname } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
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

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

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