const { Router } = require('express');
const { createUser, login, renewToken, userUpdate } = require('../controllers/auth');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validatos');
const { validateJWT } = require('../middlewares/validatejwt');

// Ruta para login (sin validación de JWT)
router.post(
    '/',
    [
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'No corresponde a formato de email').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
);

// Rutas protegidas con validación de JWT
router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'No corresponde a formato de email').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('password', 'La contraseña debe ser de 6 caracteres').isLength({ min: 6 }),
        check('lastname', 'El apellido es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createUser
);

router.get(
    '/renew',
    validateJWT,
    renewToken
);

router.put(
    '/update/:id',
    validateJWT,
    userUpdate
);

// Exportar el router
module.exports = router;
