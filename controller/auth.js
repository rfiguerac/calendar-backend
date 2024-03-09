const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuarios");
const { generarJWT } = require('../helpers/jwt');



const crearUser = async (req, res = express.response) => {
  const { password, email } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "EL usuario ya existe",
      });
    }
    usuario = new Usuario(req.body);

    // encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //guardar datos en mongoDB
    await usuario.save();

     //geenerar JsonWebToken
     const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hablar con el administrador",
    });
  }
};

const loginUsuario = async (req, res = express.response) => {
  const { email, password, name } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "EL correo no existe",
      });
    }

    // confirmar la contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if ( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario y contraseña incorrectos",
      });
    }

    //geenerar JsonWebToken
    const token = await generarJWT(usuario.id, usuario.name);
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hablar con el administrador",
    });
  }
};

const revalidarToken = async(req, res = express.response) => {
  const { uid, name } = req;

  const token = await generarJWT(uid, name);

  try {

    res.status(201).json({
      ok: true,
      msg: "renew",
      token
    });
    
  } catch (error) {
     res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

};

module.exports = {
  crearUser,
  loginUsuario,
  revalidarToken,
};
