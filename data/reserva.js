var db = require('./db');
var express=require('express');
var router = express.Router();

router.get('/', function(req, res){
    db.select().from('reserva').then(function(data){
        res.send(data);
    });
});

module.exports = router;