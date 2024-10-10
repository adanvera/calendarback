const { response, request } = require("express");
const logger = require("../helpers/logger");
const Evento = require("../models/Evento");
const { datesAllowed } = require("../helpers/isDate");

const createEvent = async (req, res = response) => {
    try {
        logger.info('Inicio de la función -> createEvent()')

        const { start, end } = req.body;
        const peridoDate = datesAllowed(start, end);

        if (!peridoDate) {
            logger.error('La fecha de fin debe ser mayor a la fecha de inicio');
            return res.status(400).json({
                ok: false,
                msg: 'La fecha de fin debe ser mayor a la fecha de inicio'
            });
        }

        const evento = new Evento(req.body);
        const eventSave = await evento.save();

        res.status(200).json({
            ok: true,
            msg: 'Evento creado correctamente',
            evento: eventSave
        });

    } catch (error) {
        logger.error('Error en la función -> createEvent()');
        logger.error('Error: ', error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    } finally {
        logger.info('Fin de la función -> createEvent()')
    }
}

const getEventList = async (req, res = response) => {
    try {
        logger.info('Inicio de la función -> getEventList()')
        const events = await Evento.find()
            .populate('user', 'name');
        res.status(200).json({
            ok: true,
            msg: 'Lista de eventos obtenida correctamente',
            events
        });
    } catch (error) {
        logger.error('Error en la función -> getEventList()');
        logger.error('Error: ', error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    } finally {
        logger.info('Fin de la función -> getEventList()')
    }
};

const updateEvent = async (req = request, res = response) => {

    logger.info('Inicio de la función -> updateEvent()')
    const eventId = req.params.id;

    try {
        const evento = await Evento.findById( eventId );

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const eventUpdate = await Evento.findByIdAndUpdate(eventId, newEvent, { new: true });

        logger.info('Evento actualizado correctamente' + eventUpdate);

        res.status(200).json({
            ok: true,
            msg: 'Evento actualizado correctamente',
            eventUpdate
        });

    } catch (error) {
        logger.error('Error en la función -> updateEvent()');
        logger.error('Error: ', error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    } finally {
        logger.info('Fin de la función -> updateEvent()')
    }
};

module.exports = {
    createEvent,
    getEventList,
    updateEvent
}