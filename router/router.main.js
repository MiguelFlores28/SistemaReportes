const express = require('express');
const router = express.Router();
const conn = require('../dbconnection.js');

router.use(express.static(__dirname + "/public"))
router.use(express.static(__dirname + "/"));

router.get('/', (req, res, next) => {
    res.render('main_index', {titulopag: "Pagina principal"});
    
});

module.exports = router;