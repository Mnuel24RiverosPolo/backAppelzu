const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    },
    correo: {
        type: String,
        unique: true,
        required: true
    },
    clave: {
        type: String,
        required: true
    },
    rol: {
        ref: "Rol",
        type: Schema.Types.ObjectId
    },
    // dni:{
    //     type: Number,
    //     required: true
    // },
    // telefono:{
    //     type: Number,
    //     required: true
    // }
}, {
    timestamps: true,
    versionKey: false
});


usuarioSchema.statics.encryptClave = async (clave) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(clave, salt);
};

usuarioSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

module.exports = model('Usuario', usuarioSchema);