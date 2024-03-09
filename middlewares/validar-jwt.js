const {response} = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) =>{

    //x-token headers
    const token= req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok:false,
            msg:'usuario no autenfificado'
        })
    }

    try {
        
        const payload = jwt.verify(
            token,
            process.env.SECRECT_JWT_SEED,
        );

       req.uid = payload.uid;
       req.name = payload.name; 

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'usuario no valido'
        })
    }



    next();
}

module.exports = {
    validarJWT
}