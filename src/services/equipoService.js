const Equipo = require('../models/Equipo')
const getAllEquipos = async () => {
  const equipos = await Equipo.find();
  return equipos;
};

const getOneEquipo = async (id) => {
  const equipo = await Equipo.findById(id);
  if(!equipo){
    return 'equipo no encontrado'
  }
  return equipo;
};

const createNewEquipo = async (nuevoEquipo) => {

  const equipoExistente = await Equipo.findOne({ _id: nuevoEquipo._id }); 
  if (equipoExistente) {
    return 'El equipo ya existe'
  }
  const equipoCreado = await nuevoEquipo.save();

  return equipoCreado;
};

const updateOneEquipo = async (id, body) => {
  const equipoActualizado = await Equipo.findByIdAndUpdate( id, body, { new: true });
  return equipoActualizado;
};

const deleteOneEquipo = async(id) => {
  
  await Equipo.findByIdAndDelete(id);

  return ;
};



module.exports = {
  getAllEquipos,
  getOneEquipo,
  createNewEquipo,
  updateOneEquipo,
  deleteOneEquipo,
};