const express = require('express');
const router = express.Router();
const conn = require('../dbconnection.js');

router.get('/', (req, res, next) => {
    res.render('main_index', {titulopag: "Pagina principal"});
    
});
router.get('/bautizos', async(req, res, next) => {
    res.render('./tablas/bautizos', {titulopag: "Bautizos"});
});

router.get('/defunciones', async(req, res, next) => {
    var sql = "SELECT * FROM defunciones; SELECT SUM(total) AS Tot FROM defunciones"
    conn.query(sql,[1, 2], (err, data, fields)=>{
        if(err) throw err;
        else{
            console.log("Resultado "+ JSON.stringify(data[0]));
            console.log("///////////////////////////////////////////////////////////////////////////////")
            console.log("Resultado "+ JSON.stringify(data[1]));
            res.render('./tablas/defunciones', {titulopag: "Defunciones", datosConsulta1:data[0], datosConsulta2:data[1]});
        }
    });
});

router.get('/matrimonios', async(req, res, next) => {
    var sql = "SELECT * FROM matrimonios; SELECT SUM(total) AS Tot FROM matrimonios";
    conn.query(sql, [1, 2], (err,data, fields)=>{
        if (err) {throw err}
        else {
            console.log("Resultado: "+ JSON.stringify(data[0]));
            console.log("//////////////////////////////////////////////////////////////////////////////");
            console.log("Resultado: " + JSON.stringify(data[1]));
            res.render('./tablas/matrimonios', {titulopag: "Matrimonios", datosConsulta1:data[0], datosConsulta2:data[1]});      
        }
    })
});


//Posteo a resultados
router.post('/resultados', async(req, res, next) => {
    const body = req.body;
    var sql="SELECT * FROM "+body.nombre_tabla+" WHERE ";
    var msg = "";
    console.log("Llegó");
    console.log(body);

    switch(body.nombre_tabla){

        case "bautizos": break;
        case "defunciones":
            if(body.siglo == "ambos"){
                sql+="(siglo= 'XVII' OR siglo= 'XVIII') AND ";
                if(((body.anio1 >= 1601 && body.anio1 <= 1699)||(body.anio1 >= 1700 && body.anio1 <= 1799)) && ((body.anio2 >= body.anio1 && body.anio2 <= 1699)||(body.anio2 >= body.anio1 && body.anio2 <= 1799))){
                    sql+="(anio>="+body.anio1+" AND anio<="+body.anio2+") AND ";
                }
                else{
                    msg="Valores ingresados fuera del rango especificado. Favor de regresar y verificar que se encuentren en el rango de 1601 a 1799";

                }
            }
            else if(body.siglo == 'XVII'){
                sql+="(siglo= 'XVII') AND ";
                if((body.anio1 >= 1601 && body.anio1 <= 1699) && (!body.anio2)){
                    sql+="(anio="+body.anio1+") AND ";
                }
                else if((body.anio1 >= 1601 && body.anio1 <= 1699) && (body.anio2 >= body.anio1 && body.anio2 <= 1699)){
                    sql+="(anio>="+body.anio1+" AND anio<="+body.anio2+") AND ";
                }    
                else{
                    msg="Valores ingresados fuera del rango especificado. Favor de regresar y verificar que se encuentren en el rango de 1601 a 1699";
                }
            }
            else{
                sql+="(siglo= 'XVIII') AND ";
                if ((body.anio2 >= 1700 && body.anio2 <= 1799) && (!body.anio1)){
                    sql+="(anio >="+body.anio2+") AND ";
                }
                else if ((body.anio2 >= 1700 && body.anio2 <= 1799) && (body.anio1 >= body.anio1 && body.anio1 <= 1799)){
                    sql+="(anio>="+body.anio1+" AND anio<="+body.anio2+") AND ";
                }
                else{
                    msg="Valores ingresados fuera del rango especificado. Favor de regresar y verificar que se encuentren en el rango de 1700 a 1799";
                }
            }

            if (body.calidad.length!=0 && body.calidad!="todas"){
                sql+="("
                for(var i=0; i<body.calidad.length; i++){
                    if(i==body.calidad.length-1){
                        sql+="calidad='"+body.calidad[i]+"') AND";
                    }
                    else{
                        sql+="calidad='"+body.calidad[i]+"' OR ";
                    }
                    
                    
                }
            }else if(body.calidad.length!=0 && body.calidad[0]=="todas"){
                sql+="(calidad='CASTIZA' OR calidad='ESPAÑOLA' OR calidad='INDIA' OR calidad='SIN_CATEGORIA' OR calidad='MESTIZA' OR calidad='MORISCA' OR calidad='MULATA' OR calidad='NEGRA') AND"
            }
            if(body.genero=="ambos"){
                sql+="(genero='F' OR genero='M');";
            }else if(body.genero=="F"){
                sql+="(genero='F');";
            }
            else{
                sql+="(genero='M');";
            }
             break;

        case "matrimonios":
            if(body.siglo == "ambos"){
                sql+="(siglo= 'XVII' OR siglo= 'XVIII') AND ";
                if(((body.anio1 >= 1601 && body.anio1 <= 1699)||(body.anio1 >= 1700 && body.anio1 <= 1799)) && ((body.anio2 >= body.anio1 && body.anio2 <= 1699)||(body.anio2 >= body.anio1 && body.anio2 <= 1799))){
                    sql+="(anio>="+body.anio1+" AND anio<="+body.anio2+") AND ";
                }
                else{
                    msg="Valores ingresados fuera del rango especificado. Favor de regresar y verificar que se encuentren en el rango de 1601 a 1799";

                }
            }
            else if(body.siglo == 'XVII'){
                sql+="(siglo= 'XVII') AND ";
                if((body.anio1 >= 1601 && body.anio1 <= 1699) && (!body.anio2)){
                    sql+="(anio="+body.anio1+") AND ";
                }
                else if((body.anio1 >= 1601 && body.anio1 <= 1699) && (body.anio2 >= body.anio1 && body.anio2 <= 1699)){
                    sql+="(anio>="+body.anio1+" AND anio<="+body.anio2+") AND ";
                }    
                else{
                    msg="Valores ingresados fuera del rango especificado. Favor de regresar y verificar que se encuentren en el rango de 1601 a 1699";
                }
            }
            else{
                sql+="(siglo= 'XVIII') AND ";
                if ((body.anio2 >= 1700 && body.anio2 <= 1799) && (!body.anio1)){
                    sql+="(anio >="+body.anio2+") AND ";
                }
                else if ((body.anio2 >= 1700 && body.anio2 <= 1799) && (body.anio1 >= body.anio1 && body.anio1 <= 1799)){
                    sql+="(anio>="+body.anio1+" AND anio<="+body.anio2+") AND ";
                }
                else{
                    msg="Valores ingresados fuera del rango especificado. Favor de regresar y verificar que se encuentren en el rango de 1700 a 1799";
                }
            }

            if(body.genero_f=="Todas"){
                sql+="(etnia_f= 'CASTIZA' OR etnia_f= 'ESPAÑOLA' OR etnia_f= 'INDIA' OR etnia_f='MESTIZA' OR etnia_f='MORISCA' OR etnia_f='MULATA' OR etnia_f='FEMENINA SIN CATEG.' OR etnia_f='NEGRA') AND";
            }else{
                sql+="(etnia_f= '"+body.genero_f+"') AND";
            }
            if(body.genero_m=="Todas"){
                sql+="(etnia_m= 'CASTIZO' OR etnia_m= 'ESPAÑOL' OR etnia_m= 'INDIO' OR etnia_m='MESTIZO' OR etnia_m='MORISCO' OR etnia_m='MULATO' OR etnia_m='MASCULINO SIN CATEG.' OR etnia_m='NEGRO')";
            }else{
                sql+="(etnia_m= '"+body.genero_m+"')";
            }
            break;
    }
    console.log("SQL="+sql);
    console.log(msg);
    conn.query(sql, (err, data, fields)=>{
        if(err) throw err;
        else{
            console.log("Resultado "+ JSON.stringify(data));
            res.render('./resultados/res', {Mensaje:msg, titulopag: "Resultados", datosConsulta:data, NT:body.nombre_tabla});
        }
    });
});

module.exports = router;