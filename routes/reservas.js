var express = require('express');
var router = express.Router();
var reserva = require('../data/controllers/reservaController');

router.get('/',(req,res)=>{
    reserva.getAll().then(reservas =>{
        res.json(reservas);
    })
});

router.get('/:id',(req,res,next)=>{
    reserva.getOne(req.params.id).then(reservas=>{
        if(reservas){
            res.json(reservas);
        }else{
            res.status(404);
            next();
        }
    });
});

router.post('/',(req,res)=>{
    reserva.create(req.body).then(reservas =>{
        res.json(reservas[0]);
    });
});

router.put('/:id',(req,res)=>{
    reserva.update(req.params.id, req.body).then(reservas=>{
        res.json(reservas);
    });
});

router.delete('/:id',(req,res)=>{
    reserva.delete(req.params.id).then(()=>{
        res.json({
            delete: true
        });
    });
});

module.exports = router;