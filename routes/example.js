// ejemplo de traer de como hacer un get a la database
var express=require('express');
var router = express.Router();
var db = require('../database/connection');

router.get('/', function(req, res){
    db.select().from('proyecto').then(function(data){
        res.send(data);
    });
});

module.exports = router;