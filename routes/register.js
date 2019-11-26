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

