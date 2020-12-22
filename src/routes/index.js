const { Router } = require('express');
const router = Router();

//Importa modelo de Usuario
const User = require('../models/User');

//Importar modulo token
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello Word'));

//Registrar/Crear usuario
router.post('/signup', async (req, res) => {
    //Obtiene datos "email" y "password"
    const { email, password } = req.body;
    //Crea nuevo usuario
    const newUser = new User({ email, password });
    //Guarda usuario en bbdd
    await newUser.save();

    //Token
    const token = jwt.sign({ _id: newUser._id }, 'secretkey');
    res.status(200).json({ token });
});

//Logear usuario
router.post('/signin', async (req, res) => {
    //Obtiene datos "email" y "contraseña"
    const { email, password } = req.body;
    //Utiliza el modelo User para buscar en la base de datos usuario con "email" indicado
    const user = await User.findOne({ email });
    //Si no existe el usuario con ese email
    if (!user) return res.status(401).send("El correo no existe..!");
    //Comprueba si coincide la contraseña del usuario(bbdd) con la recibida por parametro(formulario registro)
    if (user.password !== password) return res.status(401).send("La contraseña no coincide");

    //Creamos token
    const token = jwt.sign({ _id: user._id }, 'secretkey');
    //Devolvemos token
    return res.status(200).json({ token });
});

//Ruta publica
router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'lorem ipsum',
            date: "2020-12-14T12:01:23.407Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsum',
            date: "2020-12-14T12:01:23.407Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsum',
            date: "2020-12-14T12:01:23.407Z"
        }
    ])
});

//Ruta privada
router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Task one',
            description: 'lorem ipsum',
            date: "2020-12-14T12:01:23.407Z"
        },
        {
            _id: 2,
            name: 'Task two',
            description: 'lorem ipsum',
            date: "2020-12-14T12:01:23.407Z"
        },
        {
            _id: 3,
            name: 'Task three',
            description: 'lorem ipsum',
            date: "2020-12-14T12:01:23.407Z"
        }
    ])
})

module.exports = router;

//Funcion que comprueba si un usuario esta logeado
function verifyToken(req, res, next) {
    console.log(req.headers.autorization);
    //Comprueba que recibe la cabecera de autorizacion
    if(!req.headers.autorization) {
        console.log(req.headers.autorization);
        return res.status(401).send('No tiene autorizacion(cabecera)');
    }

    //Obtiene el token de la respuesta
    const token = req.headers.autorization.split(' ')[1];
    //Comprueba que la cabecera de autorizacion no esta vacia
    if (token === 'null') {
        return res.status(401).send('No tiene autorizacion');
    }

    //Extraer datos del token
    const payload = jwt.verify(token, 'secretkey');
    req.userId = payload._id;
    next();
}