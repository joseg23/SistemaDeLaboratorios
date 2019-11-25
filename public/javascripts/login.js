var pgClient = require("pg");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");

var connection = pgClient.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodelogin"
});

var app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(request, response) {
  response.sendFile(path.join(__dirname + "/index.pug"));
});

app.post("/auth", function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function(error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect("/home");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end(); 
  }
});

app.get("/home", function(request, response) {
  if (request.session.loggedin) {
    response.send("Welcome back, " + request.session.username + "!");
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});

app.listen(3000);

/*let carnet_field = document.querySelector("#name");
let password_field = document.querySelector("#password");
let submit_btn = document.querySelector("#submit_btn");
let link_btn = document.querySelector("#link");
let carnet_regex = new RegExp("^[0-9]{8}$");
let btnLogout = document.getElementsByClassName("disabled");
let btnLogin = document.querySelector("#login");
let log;
//let carnetBD = metodo para pedir el valor del carnet en la base
//let passBD = metodo para pedir el valor de la contraseña en la base

submit_btn.addEventListener("click", () => {
  let carnet = carnet_field.value;

  if (carnet_regex.test(carnet) && password_field.value == carnet_field.value) {
    console.log("prueba");
    var url = "index.html";

    if (
      carnet_regex.test(carnet) &&
      password_field.value == carnet_field.value
    ) {
      alert("wenas UwU " + carnet_field.value + " UwU");

      log = true;
    } else {
      if (carnet_field.value == "" || password_field.value == "") {
        alert("campo de carnet o contraseña vacio");
        event.preventDefault();
      } else {
        alert("Carnet o contraseña incorrecto");
        event.preventDefault();
      }

      log = false;
    }
  }
});

window.addEventListener("keyup", event => {
  let keyCode = event.keyCode;
  if (keyCode == 13) {
    submit_btn.click();
  }

  if (log == true) {
    btnLogout.display = "block";
  }
});

window.onload = function() {
  if (pgClient.connect()) {
    console.log("ahuveo");
  } else {
    console.log("no papuh");
  }
};
*/
