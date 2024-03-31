const { Schema, model } = require('mongoose');

const equipoSchema = new Schema({
    _id: Number,
    nombre: {
        type: String,
        unique: true,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    estado: {
        ref: 'Estado',
        default: 3,
        type: Number
        
    },
    imagen: {
        type: String,
        default: 'https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand.png'
    },
    tipo:{
        type: String,
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Equipo', equipoSchema);