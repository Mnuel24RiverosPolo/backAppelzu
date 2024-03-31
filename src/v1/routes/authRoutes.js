const { Router } = require('express');
const authController = require('../../controllers/authController');
const authJWT = require('../../middlewares/authJwt');
const verifySignUp = require('../../middlewares/verifySignUp');
const verify = require('../../middlewares/verify');

const router = Router();

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


router
    .post("/signup", [verifySignUp.verifyUsuario, verify.verificarCorreo], authController.signUpUsuario)
    .post("/signin", verify.verificarCorreo ,authController.signInUsuario)
    .post("/signinadmin", verify.verificarCorreo, authController.signInAdmin)

module.exports = router;