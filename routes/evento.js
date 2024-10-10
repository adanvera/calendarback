const { Router } = require('express');
const { check } = require('express-validator');
const { createEvent, getEventList, updateEvent, deleteEvent } = require('../controllers/evento');
const { validarCampos } = require('../middlewares/validatos');
const { isDate } = require('../helpers/isDate');
const { validateJWT } = require('../middlewares/validatejwt');
const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use(validateJWT);

router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ],
    createEvent
);

// Ruta para autenticación
router.get('/', getEventList);

router.get('/:id', (req, res) => {
    res.json({
        ok: true,
        msg: 'getEventid'
    });
});


// Actualizar Evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    updateEvent
);

router.delete('/:id', deleteEvent);

module.exports = router;