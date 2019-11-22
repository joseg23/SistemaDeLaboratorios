var express = require('express');
var router = express.Router();
var reserva = require('../data/controllers/reservaController');

function isValidId(req,res,next){
    if(!isNaN(req.params.laboratorio)) return next();
    next(new Error('Invalid ID'));
};


router.get('/',(req,res)=>{
    reserva.getAll().then(reservas =>{
        res.json(reservas);
    })
});

router.get('/:laboratorio',isValidId,(req,res,next)=>{
    reserva.getOne(req.params.laboratorio).then(reserva=>{
        if(reserva){
            res.json(reserva);
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

router.put('/:laboratorio', isValidId,(req,res)=>{
    reserva.update(req.params.laboratorio, req.body).then(reservas =>{
        res.json(stickers[0]);
    });
});

router.delete('/:laboratorio', isValidId,(req,res)=>{
    reserva.delete(req.params.laboratorio).then(()=>{
        res.json({
            delete: true
        });
    });
});

module.exports = router;