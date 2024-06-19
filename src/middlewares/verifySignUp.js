const Usuario = require("../models/Usuario");
const verifyUsuario = async (req, res, next) => {
    try {
        const { body } = req;

        const usuarioEncontrado = await Usuario.findOne({ nombre: body.nombre });
        if (usuarioEncontrado) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'El usuario ya existe',
                errors: {
                    nombre: 'El usuario ya existe'
                }
            });
        }

        const correo = await Usuario.findOne({ correo: body.correo });
        if (correo) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'El correo ya está en uso',
                errors: {
                    correo: 'El correo ya está en uso'
                }
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Error del servidor',
            errors: error
        });
    }
};

module.exports = {
    verifyUsuario
}