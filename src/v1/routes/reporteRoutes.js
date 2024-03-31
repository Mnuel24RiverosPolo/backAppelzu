const express = require("express");
const router = express.Router();
const reporteController = require("../../controllers/reporteController")
const authJWT = require("../../middlewares/authJwt.js");

router
    .get("/", reporteController.getAllReportes)
    .get("/:reporteId", reporteController.getOneReporte)
    .post("/", reporteController.createNewReporte)
    .patch("/:reporteId", reporteController.updateOneReporte)
    .delete("/:reporteId", reporteController.deleteOneReporte)
    .patch("/:reporteId/check", [authJWT.verifyToken, authJWT.esGerenteOSupervisor], reporteController.checkSupervisorOGerente)

module.exports = router;