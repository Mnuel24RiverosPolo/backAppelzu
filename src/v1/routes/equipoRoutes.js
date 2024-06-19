const express = require("express");
const router = express.Router();
const equipoController = require("../../controllers/equipoController")
const contadorDigitos = require("../../middlewares/verify.js");
const { authMiddleware } = require('../../middlewares/authJwt.js');
const { verifyToken } = require('../../middlewares/authJwt.js');

router
    .get("/",verifyToken, equipoController.getAllEquipos)
    .get("/:equipoId", equipoController.getOneEquipo)
    .post("/", equipoController.createNewEquipo)
    .patch("/:equipoId", equipoController.updateOneEquipo)
    .delete("/:equipoId", equipoController.deleteOneEquipo)
module.exports = router;