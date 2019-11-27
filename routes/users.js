var express = require('express');
var router = express.Router();
var usuario = require('../data/controllers/usuarioController');
var expressValidator = require('express-validator');
var passport = require('passport');

const bcrypt = require('bcrypt');
const saltRounds = 10;
//req.user
//req.isAuntheticated

router.post('/login', (req, res)=>{

  req.checkBody('correo','El campo de correo no puede estar vacio.').notEmpty();
  req.checkBody('correo', 'El correo que ingresaste no es valido.').isEmail();
  req.checkBody('correo', 'El correo debe tener entre 4-100 caracteres, porfavor intentar de nuevo.').len(4, 100);
  req.checkBody('contrasenia', 'La contraseña debe estar en rango de 8 a 100 caracteres.').len(8, 100);
  req.checkBody("contrasenia", "La contraseña de incluir al menos una minuscula, una mayuscula, un numero, y un caracter especial.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");

  const errors = req.validationErrors();
  const password= req.body.contrasenia;


  if(!errors){
    usuario.getOne(req.body.correo).then(users =>{
      hash = users[0].contrasenia.toString();
      userCode = users[0].code;
      bcrypt.compare(password,hash, function(err, response){
        if(response=== true)
          req.login(userCode, function(err){
            res.redirect('/');
        });
      });
    }); 
  }else{
    res.render('/', { 
      title: 'Sistema de reservas', 
      errors:errors
    });   
  }
});

router.post('/register',(req, res)=>{
  req.checkBody('username', 'El campo de correo no puede estar vacio.').notEmpty();
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
  req.checkBody('correo', 'El correo que ingresaste no es valido.').isEmail();
  req.checkBody('correo', 'El correo debe tener entre 4-100 caracteres, porfavor intentar de nuevo.').len(4, 100);
  req.checkBody('contrasenia', 'La contraseña debe estar en rango de 8 a 100 caracteres.').len(8, 100);
  req.checkBody('contrasenia', "La contraseña de incluir al menos una minuscula, una mayuscula, un numero, y un caracter especial.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  req.checkBody('passwordMatch', 'La contraseña debe estar en rango de 8 a 100 caracteres.').len(8, 100);
  req.checkBody('passwordMatch', 'Las contraseñas no coiciden.').equals(req.body.contrasenia);

  const errors = req.validationErrors();
  console.log(errors)
  const password = req.body.contrasenia;
  
  if(!errors){
    bcrypt.hash(password, saltRounds, function(err, hash) {
      usuario.create(req.body, hash).then(users =>{
        res.json(users[0]);
      })
    });
  }else{
    res.render('/', { 
      title: 'Sistema de reservas', 
      errors:errors
    });
  }
});

passport.serializeUser(function(userCode, done) {
  done(null, userCode);
});
passport.deserializeUser(function(userCode, done) {
  done(null, userCode);
});

function authenticationMiddleware () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}

module.exports = router;
