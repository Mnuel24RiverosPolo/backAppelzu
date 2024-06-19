const Reporte = require('../models/Reporte')

const mongoose = require('mongoose');

const getAllReportes = async () => {
  const reportes = await Reporte.aggregate([
    {
      $lookup: {
        from: 'usuarios',
        localField: 'operador',
        foreignField: '_id',
        as: 'operador'
      }
    },
    {
      $unwind: { path: '$operador', preserveNullAndEmptyArrays: true }
    },
    {
      $lookup: {
        from: 'usuarios',
        localField: 'supervisor',
        foreignField: '_id',
        as: 'supervisor'
      }
    },
    {
      $unwind: { path: '$supervisor', preserveNullAndEmptyArrays: true }
    },
    {
      $lookup: {
        from: 'usuarios',
        localField: 'gerente',
        foreignField: '_id',
        as: 'gerente'
      }
    },
    {
      $unwind: { path: '$gerente', preserveNullAndEmptyArrays: true }
    },
    {
      $project: {
        _id: 1, // Incluir el campo _id en el resultado
        equipo: 1,
        'operador.nombre': 1,
        fecha: 1,
        'supervisor.nombre': 1,
        'gerente.nombre': 1
      }
    },
    {
      $addFields: {
        operador: '$operador.nombre',
        supervisor: '$supervisor.nombre',
        gerente: '$gerente.nombre'
      }
    }
  ]);
  return reportes;
};


const getAllReportesByFecha = async (fecha) => {

  const reportes = await Reporte.aggregate([
    {
      $match: {
        fecha: { $regex: fecha } // Filtro de fecha: igual a la fecha de inicio
      }
    },
    {
      $lookup: {
        from: 'usuarios',
        localField: 'operador',
        foreignField: '_id',
        as: 'operador'
      }
    },
    {
      $unwind: { path: '$operador', preserveNullAndEmptyArrays: true }
    },
    {
      $lookup: {
        from: 'usuarios',
        localField: 'supervisor',
        foreignField: '_id',
        as: 'supervisor'
      }
    },
    {
      $unwind: { path: '$supervisor', preserveNullAndEmptyArrays: true }
    },
    {
      $lookup: {
        from: 'usuarios',
        localField: 'gerente',
        foreignField: '_id',
        as: 'gerente'
      }
    },
    {
      $unwind: { path: '$gerente', preserveNullAndEmptyArrays: true }
    },
    {
      $project: {
        _id: 0,
        equipo: 1,
        'operador.nombre': 1,
        fecha: 1,
        'supervisor.nombre': 1,
        'gerente.nombre': 1
      }
    },
    {
      $addFields: {
        operador: '$operador.nombre',
        supervisor: '$supervisor.nombre',
        gerente: '$gerente.nombre'
      }
    }
  ]);
  console.log(reportes)
  return reportes;
}

const getOneReporte = async (id) => {
  try {
    const reporte = await Reporte.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "usuarios", // Nombre de la colección de usuarios
          localField: "operador", // Campo en el reporte que contiene el ID del usuario
          foreignField: "_id", // Campo en la colección de usuarios que contiene el ID
          as: "operador" // Nombre del campo que contendrá el resultado del join

        }
      },
      {
        $unwind: "$operador" // Deshacer el array resultante del join
      },
      {
        $project: {
          equipo: 1,
          operador: "$operador.nombre", // Obtener el nombre del usuario del campo operador
          fecha: 1,
          otros: 1,
          items: 1,
          supervisor:1,
          observaciones:1,

        }
      }
    ]);

    if (reporte.length === 0) {
      return 'Reporte no encontrado';
    }

    return reporte[0]; // Devolver el primer documento del resultado de la agregación
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el reporte');
  }
};

const createNewReporte = async (nuevoReporte) => {

  const reporteExistente = await Reporte.findOne({ _id: nuevoReporte._id });
  if (reporteExistente) {
    return 'El reporte ya existe'
  }
  const reporteCreado = await nuevoReporte.save();

  return reporteCreado;
};

const updateOneReporte = async (id, body) => {
  const reporteActualizado = await Reporte.findByIdAndUpdate(id, body, { new: true });
  return reporteActualizado;
};

const deleteOneReporte = async (id) => {

  await Reporte.findByIdAndDelete(id);

  return;
};


const getReportesByOperador = async (operador) => {
  const reportes = await Reporte.find({ operador: operador },{ _id: 1, fecha: 1 });
  return reportes
}
const getReportesBySupervisor = async (supervisor) => {
  const reportes = await Reporte.find({ supervisor: supervisor },{ _id: 1, fecha: 1 });
  return reportes
}
const getReportesByGerente = async (gerente) => {
  const reportes = await Reporte.find({ gerente: gerente },{ _id: 1, fecha: 1 });
  return reportes
}


module.exports = {
  getAllReportes,
  getAllReportesByFecha,
  getReportesByOperador,
  getReportesBySupervisor,
  getReportesByGerente,
  getOneReporte,
  createNewReporte,
  updateOneReporte,
  deleteOneReporte,
};