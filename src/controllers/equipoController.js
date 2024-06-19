const equipoService = require('../services/equipoService')
const Equipo = require('../models/Equipo');

const getAllEquipos = async (req, res) => {
  try {
    const allEquipos = await equipoService.getAllEquipos();
    res.status(200).json({ status: 'success', data: allEquipos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error al obtener equipos' });
  }
};
const getOneEquipo = async (req, res) => {
  try {
    const { params: { equipoId } } = req;
    if (!equipoId) {
      return;
    }
    const equipo = await equipoService.getOneEquipo(equipoId);
    res.status(201).send({ status: 'OK', data: equipo });
  } catch (error) {
    console.error(error);
  }
};


const createNewEquipo = async (req, res) => {
  try {
    const { body } = req;
    if (
      !body.codigo ||
      !body.nombre ||
      !body.modelo ||
      !body.tipo
    ) {
      {
        res
          .status(400)
          .send({
            status: "FAILED",
            data: {
              error:
                "Hace falta uno de estos campos: 'nombre', 'modelo', 'tipo', 'codigo'",
            },
          });
        return;
      }
    }

    const equipo = new Equipo({
      _id: body.codigo,
      nombre: body.nombre,
      modelo: body.modelo,
      tipo: body.tipo
    });

    const createdEquipo = await equipoService.createNewEquipo(equipo);
    res.status(201).json({ status: 'OK', data: createdEquipo });

  } catch (error) {
    return res.status(500).json({
      status: "FAILED",
      data: {
        error: "Error interno del servidor",
      },
    });
  }
};

const updateOneEquipo = async (req, res) => {
  try {
    const { params: { equipoId }, body } = req;
    if (
      !equipoId ||
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
    const updatedEquipo = await equipoService.updateOneEquipo(equipoId, body);
    res.status(201).send({ status: 'OK', message: updatedEquipo.nombre + ' actualizado', data: updatedEquipo });

  } catch (error) {
    console.error(error);
  }
};



const deleteOneEquipo = async (req, res) => {
  try {
    const { params: { equipoId } } = req;
    await equipoService.deleteOneEquipo(equipoId);
    res.status(201).send({ message: equipoId + 'Eliminado' });
  } catch (error) {
    console.error(error);
  }
};


module.exports = {
  getAllEquipos,
  getOneEquipo,
  createNewEquipo,
  updateOneEquipo,
  deleteOneEquipo,
};