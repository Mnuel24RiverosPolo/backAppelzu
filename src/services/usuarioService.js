const Usuario = require('../models/Usuario')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const getAllUsuarios = async () => {
  const usuarios = await Usuario.aggregate([
    {
      $lookup: {
        from: 'rols', // Nombre de la colección de roles en tu base de datos
        localField: 'rol',
        foreignField: '_id',
        as: 'rol'
      }
    },
    {
      $unwind: { path: '$rol', preserveNullAndEmptyArrays: true } // Deshacer el array creado por $lookup
    },
    {
      $project: {
        _id: 0,
        nombre: 1,
        correo: 1,
        clave: 1,
        'rol.name': 1 // Proyectar solo el nombre del rol
      }
    },
    {
      $addFields: {
        rol: '$rol.name' // Reemplazar el objeto rol por su nombre
      }
    }
  ]);
  return usuarios;
};

const getOneUsuario = async (id) => {
  const usuario = await Usuario.aggregate([
    {
      $match: {
        _id: new ObjectId(id)
      }
    },
    {
      $lookup: {
        from: 'rols', // Nombre de la colección de roles en tu base de datos
        localField: 'rol',
        foreignField: '_id',
        as: 'rol'
      }
    },
    {
      $unwind: { path: '$rol', preserveNullAndEmptyArrays: true } // Deshacer el array creado por $lookup
    },
    {
      $project: {
        _id: 0,
        nombre: 1,
        correo: 1,
        clave: 1, 
        'rol.name': 1 // Proyectar solo el nombre del rol
      }
    },
    {
      $addFields: {
        rol: '$rol.name' // Reemplazar el objeto rol por su nombre
      }
    }
  ]);
  if(!usuario){
    return 'usuario no encontrado'
  }
  return usuario;
};

const createNewUsuario = async (nuevoUsuario) => {

  const usuarioExistente = await Usuario.findOne({ correo: nuevoUsuario.correo }); 
  if (usuarioExistente) {
    return 'El correo ya existe'
  }
  nuevoUsuario.clave = await Usuario.encryptClave(nuevoUsuario.clave);
  const usuarioCreado = await nuevoUsuario.save();

  return usuarioCreado;
};

const updateOneUsuario = async (id, body) => {
  const usuarioActualizado = await Usuario.findByIdAndUpdate( id, body, { new: true });
  return usuarioActualizado;
};

const deleteOneUsuario = async(id) => {
  
  await Usuario.findByIdAndDelete(id);

  return ;
};

const loginUsuario = async(correo, clave)=>{
  const usuarioEncontrado = await Usuario.findOne({ correo: correo });
  if (!usuarioEncontrado) return 0;
  const clavesIguales = await Usuario.comparePassword(clave, usuarioEncontrado.clave);
  if (!clavesIguales) return 1;

  return usuarioEncontrado;
}

module.exports = {
  getAllUsuarios,
  getOneUsuario,
  createNewUsuario,
  updateOneUsuario,
  deleteOneUsuario,
  loginUsuario,
};