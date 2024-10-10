const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'getEvents'
    });
});

router.get('/:id', (req, res) => {
    res.json({
        ok: true,
        msg: 'getEventid'
    });
});

router.post('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'createEvent'
    });
});

router.put('/:id', (req, res) => {
    res.json({
        ok: true,
        msg: 'updateEvent'
    });
});

router.delete('/:id', (req, res) => {
    res.json({
        ok: true,
        msg: 'deleteEvent'
    });
});

module.exports = router;