var express = require('express');
var router = express.Router();
var usuario = require('../data/controllers/verificarController');


function ValidUser(req,res,next){
  if(!isNaN(req.params.nombre)) return next();
    next(new Error('Invalid User'));
};

router.get('/',(req,res)=>{
  usuario.getAll().then(usuario =>{
      res.json(usuario);
  })
});

router.get('/:nombre',ValidUser,(req,res,next)=>{
  usuario.getOne(req.params.nombre).then(usuario=>{
      if(usuario){
          res.json(usuario);
      }else{
          res.status(404);
          next();
      }
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
