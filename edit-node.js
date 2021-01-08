const express = require("express");
const app = express();
const fs = require("fs");
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

var nodi = [];
var nodo = {};

readTreeFromJson();
var contenuto = nodi[0].content;
var nodoScelto = 1;
var nodeIndex = 0;
var titolo = nodi[0].title;

app.get("/", function (req, res) {
  res.render("edit-node", {numNodo: nodoScelto, titulo: titolo, descr: contenuto});
})  //end get function

app.post("/", function (req, res) {
  nodoScelto = req.body.numNodo
  nodeIndex = nodi.findIndex(o => o.nodeNumber === nodoScelto);
  if (nodeIndex != -1) {
    contenuto = nodi[nodeIndex].content;
    titolo = nodi[nodeIndex].title;
  }
  else
  {
    contenuto = "Nodo non trovato...";
  }
  res.redirect("/");

})  //end post function

app.post("/new-content", function (req,res) {
  if (req.body.cancel != undefined) {
    contenuto = nodi[nodeIndex].content;
    titolo = nodi[nodeIndex].title;
  }
  if (req.body.confirm != undefined ) {
    nodi[nodeIndex].content = req.body.descriz;
    contenuto = req.body.descriz;
    nodi[nodeIndex].title = req.body.titulo;
    titolo = req.body.titulo;
  }

  res.redirect("/");
})  // end post new-content function

app.post("/confirm", function(req, res) {
  writeTreeToJson();
  res.redirect("/");
})  //end post confirm-all function

app.listen(process.env.PORT || 3000, function () {
  // console.log("Server started.");
}); // end listen function


function readTreeFromJson() {
  var data = fs.readFileSync(__dirname + '/data.mini.json', 'utf8')
  // data = data.slice(1); //delete first 2 char
  nodi = JSON.parse(data).LymphTree;
} // end function readTreeFromJson

function writeTreeToJson() {
  var data = '{ "LymphTree": ' + JSON.stringify(nodi) + '}';
  fs.copyFileSync(__dirname + "/data.mini.json",__dirname + "/data.mini.old.json");
  fs.writeFileSync(__dirname + '/data.mini.json', data, 'utf8')
} // end function readTreeFromJson
