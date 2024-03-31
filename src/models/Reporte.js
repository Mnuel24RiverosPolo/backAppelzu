const { Schema, model} = require('mongoose');

const reporteSchema = new Schema(
    {
        equipo: {
            ref: 'Equipo',
            type: Number
        },
        operador: {
            ref: "Usuario",
            type: Schema.Types.ObjectId
        },
        fecha: {
            type: String,
            required: true
        },
        // horaInicio: {
        //     type: String,
        //     required: true
        // },
        // horaFin:{
        //     type: String,
        //     required: true
        // },
        // turno: {
        //     type: String,
        //     required: true
        // },
        // horometro: {
        //     type: String,
        //     required: true
        // },
        // kilometraje: {
        //     type: Number,
        //     required: true
        // },
        // galones: {
        //     type: Number,
        //     required: true
        // },
        // ubicacion: {
        //     type: String,
        //     required: true
        // },
        // otros: {
        //     type: String,
        // },
        items: [{
            numero: Number,
            puntosInspeccion:[{
                type: Number
            }],
            observaciones: String
        }],
        supervisor: {
            ref: "Usuario",
            type: Schema.Types.ObjectId
        },
        gerente: {
            ref: "Usuario",
            type: Schema.Types.ObjectId
        }
    }, {
        versionKey: false
    }   
);

module.exports = model("Reporte", reporteSchema)