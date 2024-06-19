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
      
        otros: {
            type: String,
        },
        items: [{
            numero: Number,
            puntosInspeccion:{
                
                

            },
            estado: String
        }],
        observaciones: {
            type : String
        },
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