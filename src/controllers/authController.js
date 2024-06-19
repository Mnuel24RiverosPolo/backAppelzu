const usuarioService = require('../services/usuarioService')
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const Usuario = require('../models/Usuario');
const authJWT = require('../middlewares/authJwt');
const Rol = require('../models/Rol');

const signUpUsuario = async (req, res) => {
    try {
        const { body } = req;

        // Verificar que todos los campos necesarios estén presentes
        if (!body.nombre || !body.correo || !body.clave) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: "Hace falta uno de estos campos: 'nombre', 'correo', 'clave'",
                errors: {
                    nombre: !body.nombre ? 'El campo nombre es obligatorio' : undefined,
                    correo: !body.correo ? 'El campo correo es obligatorio' : undefined,
                    clave: !body.clave ? 'El campo clave es obligatorio' : undefined,
                }
            });
        }

        // Crear un nuevo usuario
        const usuario = new Usuario({
            nombre: body.nombre,
            correo: body.correo,
            clave: body.clave
        });

        const savedUsuario = await usuarioService.createNewUsuario(usuario);
        const tokenPayload = {
            id: savedUsuario._id,
            name: savedUsuario.nombre,
        };

        // Crear un token
        const token = jwt.sign(tokenPayload, SECRET, {
            expiresIn: 43200, // 12 horas
        });

        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Registro Exitoso',
            data: {
                user: {
                    id: savedUsuario._id,
                    name: savedUsuario.nombre,
                    email: savedUsuario.correo,
                },
                token: token
            }
        });
        return;
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Fallo al registrarse',
            errors: error
        });
        return;
    }
};
const signInUsuario = async (req, res) => {
    try {
        const { body } = req;

        
        const usuario = await usuarioService.loginUsuario(body.correo, body.clave);
        if (usuario === 0) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'No existe algún usuario con el correo ingresado',
                errors: {
                    email: 'No existe algún usuario con el correo ingresado'
                }
            });
        }
        if (usuario === 1) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'La contraseña es incorrecta',
                errors: {
                    password: 'La contraseña es incorrecta'
                }
            });
        }

        const rol = await Rol.findOne({ _id: { $in: usuario.rol } });
        const userRol = rol.name;
        const tokenPayload = {
            id: usuario._id,
            nombre: usuario.nombre,
            rol: userRol
        };

        const token = jwt.sign(tokenPayload, SECRET, {
            expiresIn: 86400 // 24 horas
        });

        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Inicio de Sesión Exitoso',
            data: {
                user: {
                    id: usuario._id,
                    name: usuario.nombre,
                    email: usuario.correo,
                    role: userRol
                },
                token: token
            }
        });
        return;
    } catch (error) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Error al Logearse',
            errors: error
        });
        return;
    }
};
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