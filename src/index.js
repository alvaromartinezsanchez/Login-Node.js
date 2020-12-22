//Importamos modulo express y almacenamos en variable
const express = require('express');
const app = express();
//Cors
const cors = require('cors');

//Importa archivo database(conexion a bbdd)
require('./database');

//Activa cors
app.use(cors());

//Permite leer/interpretar archivos json
app.use(express.json());

//Importa rutas
app.use('/api', require('./routes/index'));

//Ejecuta express escuchando en el puerto 3000
app.listen(3000);
console.log('Server run on port ', 3000);