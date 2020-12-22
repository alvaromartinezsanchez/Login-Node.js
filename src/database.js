//Importa modulo para realizar conexion a la base de datos
const mongoose = require('mongoose');

//Realiza conexion a la bbdd
mongoose.connect('mongodb://localhost/angular-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is Connected'))
    .catch(err => console.log(err));