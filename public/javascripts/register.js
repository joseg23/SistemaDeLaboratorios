var express = require("express");
var bodyParser = require("body-parser");

var db = require("pg");
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("connection succeeded");
});

var app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.post("/sign_up", function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var pass = req.body.password;

  var data = {
    name: name,
    email: email,
    password: pass
  };
  db.collection("details").insertOne(data, function(err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });
});

app
  .get("/", function(req, res) {
    res.set({
      "Access-control-Allow-Origin": "*"
    });
    return res.redirect("index.pug");
  })
  .listen(3000);

console.log("server listening at port 3000");

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
      alert("Bienvenido " + carnet_field.value + " UwU");

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
  } else {
  }
});
*/
