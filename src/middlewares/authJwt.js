const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');



const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Token de autenticación no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ status: 'error', message: 'Token de autenticación inválido' });
    }
};

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            return res.status(403).json({ status: 'error', message: "No hay token" });
        }

        const decoded = jwt.verify(token, SECRET);
        req.usuarioId = decoded.id;
        const usuario = await Usuario.findById(req.usuarioId, { clave: 0 });

        if (!usuario) {
            return res.status(404).json({ status: 'error', message: "Usuario no encontrado" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ status: 'error', message: 'No autorizado' });
    }
};

//Se verifica si es Operador
const esOperador = async (req, res, next) => {
    try {

        const usuario = await Usuario.findById(req.usuarioId);
        const rol = await Rol.findOne({ _id: { $in: usuario.rol } });


        if (rol.name === "operador") {
            next();
            return;
        }
        return res.status(403).json({ message: "Requiere el rol de operador!" });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

//Se verifica si es Administrador
const esAdministrador = async (req, res, next) => {
    try {
        const usuario = await Usuario.findById(req.usuarioId);
        const rol = await Rol.findOne({ _id: { $in: usuario.rol } });

        if (rol.name === "administrador") {
            next();
            return;
        }

        res.status(403).json({ message: "Requiere el rol de administrador!" });
        return
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error });
        return
    }
};

//Se verifica si es tecnico
const esTecnico = async (req, res, next) => {
    try {

        const usuario = await Usuario.findById(req.usuarioId);
        const rol = await Rol.findOne({ _id: { $in: usuario.rol } });


        if (rol.name === "tecnico") {
            next();
            return;
        }
        return res.status(403).json({ message: "Requiere el rol de técnico!" });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

//Se verifica si es Gerente
const esGerente = async (req, res, next) => {
    try {

        const usuario = await Usuario.findById(req.usuarioId);
        const rol = await Rol.findOne({ _id: { $in: usuario.rol } });


        if (rol.name === "gerente") {
            next();
        }
        return res.status(403).json({ message: "Requiere el rol de gerente!" });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

//Se verifica si es Supervisor
const esSupervisor = async (req, res, next) => {
    try {

        const usuario = await Usuario.findById(req.usuarioId);

        const rol = await Rol.findOne({ _id: { $in: usuario.rol } });

        if (rol.name == "supervisor") {
            next();
            return;
        }
        return res.status(403).json({ message: "Requiere el rol de supervisor!" });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};
const esGerenteOSupervisor = async (req, res, next) => {
    try {
        const usuario = await Usuario.findById(req.usuarioId);
        const rol = await Rol.findOne({ _id: { $in: usuario.rol } });

        if (rol.name === "gerente") {
            req.rolName = rol.name
            next();
            return;
        }
        if (rol.name === "supervisor") {
            req.rolName = rol.name
            next();
            return;
        }

        return res.status(403).json({ message: "Requiere el rol de gerente o supervisor!" });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
};

module.exports = {
    verifyToken,
    esAdministrador,
    esOperador,
    esTecnico,
    esGerente,
    esSupervisor,
    esGerenteOSupervisor,
    authMiddleware
}