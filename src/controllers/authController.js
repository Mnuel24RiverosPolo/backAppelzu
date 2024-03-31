const usuarioService = require('../services/usuarioService')
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const Usuario = require('../models/Usuario');
const authJWT = require('../middlewares/authJwt');
const Rol = require('../models/Rol');

const signUpUsuario = async (req, res) => {
    try {
        const { body } = req;
        if (
            !body.nombre ||
            !body.correo ||
            !body.clave
        ) {
            {
                res
                    .status(400)
                    .send({
                        status: "FAILED",
                        data: {
                            error:
                                "Hace falta uno de estos campos: 'nombre', 'correo', 'clave'",
                        },
                    });
                return;
            }
        }
        const usuario = new Usuario({
            nombre: body.nombre,
            correo: body.correo,
            clave: body.clave
        });

        const savedUsuario = await usuarioService.createNewUsuario(usuario);

        const tokenPayload = {
            id: savedUsuario._id,
            name: savedUsuario.nombre
        };
        // Create a token
        const token = jwt.sign(tokenPayload, SECRET, {
            expiresIn: 43200,
        });
        res.status(200).json({ token });
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ error, message: 'no hay datos' });
        return
    }
};

const signInUsuario = async (req, res) => {
    try {
        const { body } = req;
        const usuario = await usuarioService.loginUsuario(body.correo, body.clave);
        if (usuario == 0) return res.status(400).json({ message: 'No existe algun usuario con el correo ingresado' });
        if (usuario == 1) return res.status(400).json({ message: 'la contraseña es incorrecta' });
        const tokenPayload = {
            id: usuario._id,
            nombre: usuario.nombre
        };

        const token = jwt.sign(tokenPayload, SECRET, {
            expiresIn: 86400
        })
        res.status(200).json({ token })
        return
    } catch (error) {
        res.status(500).json({ error, message: 'Error al Logearse' });
        return
    }

}

const signInAdmin = async (req, res) => {
    try {
        const { body } = req;
        const usuario = await usuarioService.loginUsuario(body.correo, body.clave);
        const rol = await Rol.findOne({ _id: { $in: usuario.rol } });
        if (rol && rol.name === 'administrador') {
            const tokenPayload = {
                id: usuario._id,
                nombre: usuario.nombre
            };
            const token = jwt.sign(tokenPayload, SECRET, {
                expiresIn: 43200,
            });
            res.status(200).json({ token });
            return
        }
        res.status(200).json({ message: 'No es Administrador' });
        return
    } catch (error) {
        res.status(500).json({ error, message: 'Error al Logearse como Admin' });
    }
}

module.exports = {
    signUpUsuario,
    signInUsuario,
    signInAdmin
}