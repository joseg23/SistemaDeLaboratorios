var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const Knex = require("knex");

//Authentication Packages
var session = require('express-session');
var passport = require('passport');
const KnexSessionStore = require("connect-session-knex")(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reservasRouter = require('./routes/reservas');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Bootstrap 4 y librerías necesarias
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/fullcalendar', express.static(__dirname + 'node_modules/fullcalendar/dist'));
app.use('/moment', express.static(__dirname + 'node_modules/moment'));

//Sessions

const knex = Knex({
  client: "pg",
  connection: process.env.DB_URL
});

const store = new KnexSessionStore({
  knex: knex,
  tablename: "sessions" // optional. Defaults to 'sessions'
});

app.use(session({
  name: process.env.SESS_NAME,
  secret: 'jsbdjabdjsabdjkabdj',
  resave: false,
  store: store,
  saveUninitialized: false,
  //cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  //res.locals.UserName = req.
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reserva',reservasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
