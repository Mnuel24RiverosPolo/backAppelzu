const Reporte = require('../models/Reporte')
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
  const reporte = await Reporte.findById(id);
  if (!reporte) {
    return 'reporte no encontrado'
  }
  return reporte;
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