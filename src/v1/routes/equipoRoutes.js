const express = require("express");
const router = express.Router();
const equipoController = require("../../controllers/equipoController")
const contadorDigitos = require("../../middlewares/verify.js");

router
    .get("/", equipoController.getAllEquipos)
    .get("/:equipoId", equipoController.getOneEquipo)
    .post("/", contadorDigitos.verificarCodigo,equipoController.createNewEquipo)
    .patch("/:equipoId", equipoController.updateOneEquipo)
    .delete("/:equipoId", equipoController.deleteOneEquipo)
module.exports = router;