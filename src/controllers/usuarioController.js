const usuarioService = require('../services/usuarioService')
const Usuario = require('../models/Usuario');

const getAllUsuarios = async (req, res) => {
  try {
    const allUsuarios = await usuarioService.getAllUsuarios();
    console.log(allUsuarios)
    res.status(201).send({ status: 'OK', data: allUsuarios });
  } catch (error) {
    console.error(error);
  }
};

const getOneUsuario = async (req, res) => {
  try {
    const { params: { usuarioId } } = req;
    if (!usuarioId) {
      return;
    }
    const usuario = await usuarioService.getOneUsuario(usuarioId);
    res.status(201).send({ status: 'OK', data: usuario });
  } catch (error) {
    console.error(error);
  }
};


const createNewUsuario = async (req, res) => {
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
                "Hace falta uno de estos campos: 'nombre', 'correo', 'clave', ",
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

    const createdUsuario = await usuarioService.createNewUsuario(usuario);
    res.status(201).send({ status: 'OK', data: createdUsuario });

  } catch (error) {
    console.error(error);
  }
};

const updateOneUsuario = async (req, res) => {
  try {
    const { params: { usuarioId }, body } = req;
    if (
      !usuarioId ||
      !body
    ) {
      {
        res
          .status(400)
          .send({
            status: "FAILED",
            data: {
              error:
                "no hay un ID o no hay datos por cambiar",
            },
          });
        return;
      }
    }
    const updatedUsuario = await usuarioService.updateOneUsuario(usuarioId, body);
    res.status(201).send({ status: 'OK', message: 'Usuario Actualizado', data: updatedUsuario });

  } catch (error) {
    console.error(error);
  }
};

const deleteOneUsuario = async (req, res) => {
  try {
    const { params: { usuarioId } } = req;
    await usuarioService.deleteOneUsuario(usuarioId);
    res.status(201).send({ message: 'Usuario Eliminado' });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllUsuarios,
  getOneUsuario,
  createNewUsuario,
  updateOneUsuario,
  deleteOneUsuario,
};