const express = require("express");
const Evento = require("../models/events");

const getEventos = async (req, res = express.response) => {

  const evento = await Evento.find().populate('user','name');
  try {
    res.status(201).json({
        ok: true,
        evento
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hablar con el administrador",
    });
  }
};
const crearEvento = async (req, res = express.response) => {
  
  try {
    const evento = new Evento(req.body);
    evento.user = req.uid;
    console.log(req.body);
    eventoGuardado =await evento.save();
    res.status(201).json({
        ok: true,
       evento: eventoGuardado
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hablar con el administrador",
    });
  }
};
const actualizarEvento = async (req, res = express.response) => {
  const eventoID= req.params.id;
  try {
    const evento = await Evento.findById(eventoID);
    // verificamos si el evento existe
    if(!evento){
      return res.status(404).json({
        ok: false,
        msg: "evento no existe",
      });
    }
    // verificamos si el evento fue creado por la misma persona que lo quiere editar
    if(evento.user.toString() !== req.uid){
      return res.status(401).json({
        ok: false,
        msg: "no autorizado para esta acción",
      });
    }
    const nuevoEvento = {
      ...req.body,
      user:req.uid
    }

    const eventoActualizado = await Evento.findByIdAndUpdate(eventoID, nuevoEvento, {new: true});

    res.status(201).json({
        ok: true,
        eventoActualizado
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hablar con el administrador",
    });
  }
};
const eliminarEvento = async (req, res = express.response) => {

  const eventoID= req.params.id;
  try {
    const evento = await Evento.findById(eventoID);
    // verificamos si el evento existe
    if(!evento){
      return res.status(404).json({
        ok: false,
        msg: "evento no existe",
      });
    }
    // verificamos si el evento fue creado por la misma persona que lo quiere Eliminar
    
    if(evento.user.toString() !== req.uid){
      return res.status(401).json({
        ok: false,
        msg: "no autorizado para esta acción",
      });
    }
    const eventoEliminado = await Evento.findByIdAndDelete(eventoID);

    res.status(201).json({
        ok: true,
        eventoEliminado
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hablar con el administrador",
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
