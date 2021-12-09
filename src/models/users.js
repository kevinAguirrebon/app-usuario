const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    nombre: {
        type: 'string',
        require: true
    },
    apellido: {
        type: 'string',
        require: true
    },
    usuario: {
        type: 'string',
        require: true
    },
    correo: {
        type: 'string',
        require: true
    },
},{
    timestamps: true
})

module.exports = model('user', userSchema);