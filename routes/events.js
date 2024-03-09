/*
    rutas de usuario / Eventos
    host + /api/Events
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controller/events");

//   validar todas las rutas
router.use(validarJWT);

// obtener eventos
router.get("/", getEventos);

// Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "el titulo es obligatorio").not().isEmpty(),
    check("start", "fecha de inicio es obligatoria").custom(isDate),
    check("end", "fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// Actualizar Evento
router.put(
  "/:id",
  [
    check("title", "el titulo es obligatorio").not().isEmpty(),
    check("start", "fecha de inicio es obligatoria").custom(isDate),
    check("end", "fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);

// Eliminar Evento
router.delete("/:id", eliminarEvento);

module.exports = router;
