const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    lastname: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    preferences: {
        type: Array,
        default: [
            {
                "color" : "#3498db",
            }
        ]
    }
});

module.exports = model('Usuario', usuarioSchema);