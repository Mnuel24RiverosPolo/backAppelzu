const reporteService = require('../services/reporteService');
const Reporte = require('../models/Reporte');



const getAllReportes = async (req, res) => {
  try {
    const { body } = req;
    if(!body.fecha){
      const allReportes = await reporteService.getAllReportes();
      return res.status(201).send({ status: 'OK', data: allReportes });
    } else {
      const fechaFiltrar = new RegExp(`^${body.fecha}`);
      const allReportes = await reporteService.getAllReportesByFecha(fechaFiltrar);
      return res.status(201).send({ status: 'OK', data: allReportes });
    }
    
  } catch (error) {
    console.error(error);
  }
};

const getOneReporte = async (req, res) => {
  try {
    const { params: { reporteId } } = req;
    if (!reporteId) {
      return;
    }
    const reporte = await reporteService.getOneReporte(reporteId);
    res.status(201).send({ status: 'OK', data: reporte });
  } catch (error) {
    console.error(error);
  }
};


const createNewReporte = async (req, res) => {
  try {
    const { body } = req;
    if (
      !body.codigo ||
      !body.operador ||
      !body.fecha||
      !body.observaciones
    ) {
      {
        res
          .status(400)
          .send({
            status: "FAILED",
            data: {
              error:
                "Hace falta uno de estos campos: 'codigo', 'operador', 'fecha'",
            },
          });
        return;
      }
    }
    console.log(body);
    const items = body.items.map(item => ({
      numero: item.numero,
      puntosInspeccion: item.puntosInspeccion,
      estado: item.estado,
      
    }));

    const reporte = new Reporte({
      equipo: body.codigo,
      operador: body.operador,
      fecha: body.fecha,
      otros: body.otros,
      items: items,
      observaciones: body.observaciones
    });


    const createdReporte = await reporteService.createNewReporte(reporte);
    res.status(201).send({ status: 'OK', data: createdReporte });

  } catch (error) {
    console.error(error);
  }
};

const updateOneReporte = async (req, res) => {
  try {
    const { params: { reporteId }, body } = req;
    if (
      !reporteId ||
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
    const updatedReporte = await reporteService.updateOneReporte(reporteId, body);
    res.status(201).send({ status: 'OK', message: updatedReporte._id + ' actualizado', data: updatedReporte });

  } catch (error) {
    console.error(error);
  }
};



const deleteOneReporte = async (req, res) => {
  try {
    const { params: { reporteId } } = req;
    await reporteService.deleteOneReporte(reporteId);
    res.status(201).send({ message: reporteId + 'Eliminado' });
  } catch (error) {
    console.error(error);
  }
};

const checkSupervisorOGerente = async (req, res) => {
  try {
    const { params: { reporteId }, usuarioId, rolName } = req;
    if(rolName === "gerente") {
        const body = ({ gerente: usuarioId});
        const reporte = await reporteService.updateOneReporte(reporteId, body);
        res.status(200).send({ message: reporte });
    }
    if(rolName === "supervisor"){
        const body = ({ supervisor: usuarioId})
        const reporte = await reporteService.updateOneReporte(reporteId, body);
        res.status(200).send({ message: reporte });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = {
  getAllReportes,
  getOneReporte,
  createNewReporte,
  updateOneReporte,
  deleteOneReporte,
  checkSupervisorOGerente
};