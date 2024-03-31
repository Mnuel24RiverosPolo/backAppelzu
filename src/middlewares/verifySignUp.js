const Usuario = require("../models/Usuario");
const verifyUsuario = async (req, res, next) => {
    try {
        const { body } = req
        const usuarioEncontrado = await Usuario.findOne({ nombre: body.nombre });
        if (usuarioEncontrado)
            return res.status(400).json({ message: "El usuario ya existe" });

        const correo = await Usuario.findOne({ correo: body.correo });
        if (correo)
            return res.status(400).json({ message: "El correo ya está en uso" });

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    verifyUsuario
}