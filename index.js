const express = require("express");
const cors = require('cors')
require('dotenv').config();
const {dbConnection} = require('./database/index');

// crear el servidor de express
const app = express();

// base de datos
dbConnection();

// cors
app.use(cors());

// Directorio Publico

app.use( express.static('public'));

// Lectura y parseo del body

app.use( express.json() );

// rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// auth // crear, login, renew token

// CRUD: eventos



// escuchar peticiones

app.listen(process.env.PORT, () => {
  console.log(`corriendo en el puerto ${process.env.PORT}`);
});
