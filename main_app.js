//Script principal
const express = require('express');
const app = express();
const puerto = 10000;
const connection = require('./dbconnection.js');
const bodyParser = require('body-parser');

//Inicialización del body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Creación del motor de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Definición de rutas de trabajo
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public'));

app.use('/', require('./router/router.main'));
app.use('/Tablas', require('./router/router.tablas'));

//Servidor de express
app.listen(puerto, () =>{
    console.log('Servidor escuchando en el puerto ', puerto);
})