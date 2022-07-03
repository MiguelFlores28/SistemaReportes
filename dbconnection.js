var mysql = require('mysql');

//Definición de la conexión con MySQL
var dbconn = mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: 'mafl2000',
    database: 'historia_demografica'
});

dbconn.connect ((err) =>{
    if(err) throw err;
    console.log('Conectado a la base de datos');
})

module.exports = dbconn;;