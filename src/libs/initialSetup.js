const Rol = require("../models/Rol.js");
const Estado = require("../models/Estado.js");
const usuarioService = require('../services/usuarioService')
const Usuario = require("../models/Usuario.js");
const {ADMIN_CLAVE, ADMIN_CORREO, ADMIN_NOMBRE, ADMIN_ROL}= require("../config");
const createRoles = async () => {
  try {
    // Count Documents
    const count = await Rol.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Rol({ name: "operador" }).save(),
      new Rol({ name: "tecnico" }).save(),
      new Rol({ name: "gerente" }).save(),
      new Rol({ name: "supervisor"}).save(),
      new Rol({ name: "administrador"}).save(),

    ]);

  } catch (error) {
    console.error(error);
  }
};

const createEstados = async () => {
    try {
      // Count Documents
      const count = await Estado.estimatedDocumentCount();
  
      // check for existing roles
      if (count > 0) return;
  
      // Create default Roles
      const values = await Promise.all([
        new Estado({ _id: 1,name: "en mantenimiento" }).save(),
        new Estado({ _id: 2,name: "en uso" }).save(),
        new Estado({ _id: 3,name: "sin uso" }).save(),
        new Estado({ _id: 4,name: "alquilado" }).save(),
      ]);

    } catch (error) {
      console.error(error);
    }
  };

const createAdmin = async () => {

  const rol = await Rol.findOne({ name: { $in: ADMIN_ROL } });
  
  const rolId = rol._id;

  const usuario = new Usuario({
    nombre: ADMIN_NOMBRE,
    correo: ADMIN_CORREO,
    clave: ADMIN_CLAVE,
    rol: rolId,
  });
  await usuarioService.createNewUsuario(usuario);

};
createRoles();
createEstados();
createAdmin();