const express = require("express");
const router = express.Router();
const usuarioController = require("../../controllers/usuarioController")

router
    .get("/", usuarioController.getAllUsuarios)
    .get("/:usuarioId", usuarioController.getOneUsuario)
    .post("/", usuarioController.createNewUsuario)
    .patch("/:usuarioId", usuarioController.updateOneUsuario)
    .delete("/:usuarioId", usuarioController.deleteOneUsuario)

module.exports = router;

