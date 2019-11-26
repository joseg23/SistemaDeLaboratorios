var express = require('express');
var router = express.Router();
var usuario = require('../data/controllers/usuarioController');


function ValidUser(req,res,next){
  if(!isNaN(req.params.email)) return next();
    next(new Error('Invalid User'));
};

router.get('/',(req,res)=>{
  usuario.getAll().then(usuario =>{
      res.json(usuario);
  })
});

router.get('/:email',ValidUser,(req,res,next)=>{
  usuario.getOne(req.params.email).then(usuario=>{
      if(usuario){
          res.json(usuario);
      }else{
          res.status(404);
          next();
      }
  });
});

module.exports = router;
