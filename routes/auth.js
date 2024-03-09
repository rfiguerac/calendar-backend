/*
    rutas de usuario / Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
  crearUser,
  loginUsuario,
  revalidarToken,
} = require("../controller/auth");

router.post(
  "/new",
  [
    // middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").isLength({ min: 6 }),
    validarCampos
  ],
  crearUser
);

router.post(
  "/",
  [
    // middlewares
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es de minimo 6 caracteres").isLength({
      min: 6,
    }),
  ],
  loginUsuario
);

router.get(
  "/renew",
  [
    // middlewares
    check("token", "El token es obligatorio").not().isEmpty(),
  ],
  validarJWT,
  revalidarToken
);
// O1L2ctA2Xqf1iCZ1
// mern_user
module.exports = router;
