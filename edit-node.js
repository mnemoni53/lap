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
var domanda = nodi[0].question;
var risp1 = nodi[0].answer1;
var risp2 = nodi[0].answer2;
var risp3 = nodi[0].answer3;
var risp4 = nodi[0].answer4;
var risp5 = nodi[0].answer5;
var risp6 = nodi[0].answer6;
var nxNodo1 = nodi[0].nextNode1;
var nxNodo2 = nodi[0].nextNode2;
var nxNodo3 = nodi[0].nextNode3;
var nxNodo4 = nodi[0].nextNode4;
var nxNodo5 = nodi[0].nextNode5;
var nxNodo6 = nodi[0].nextNode6;



app.get("/", function (req, res) {
  res.render("edit-node", {
    numNodo: nodoScelto,
    titulo: titolo,
    descr: contenuto,
    domanda: domanda,
    risp1: risp1,
    risp2: risp2,
    risp3: risp3,
    risp4: risp4,
    risp5: risp5,
    risp6: risp6,
    nxNodo1: nxNodo1,
    nxNodo2: nxNodo2,
    nxNodo3: nxNodo3,
    nxNodo4: nxNodo4,
    nxNodo5: nxNodo5,
    nxNodo6: nxNodo6
   });
})  //end get function

app.post("/", function (req, res) {
  nodoScelto = req.body.numNodo
  nodeIndex = nodi.findIndex(o => o.nodeNumber === nodoScelto);
  if (nodeIndex != -1) {
    contenuto = nodi[nodeIndex].content;
    titolo = nodi[nodeIndex].title;
    domanda = nodi[nodeIndex].question;
    risp1 = nodi[nodeIndex].answer1;
    risp2 = nodi[nodeIndex].answer2;
    risp3 = nodi[nodeIndex].answer3;
    risp4 = nodi[nodeIndex].answer4;
    risp5 = nodi[nodeIndex].answer5;
    risp6 = nodi[nodeIndex].answer6;
    nxNodo1 = nodi[nodeIndex].nextNode1;
    nxNodo2 = nodi[nodeIndex].nextNode2;
    nxNodo3 = nodi[nodeIndex].nextNode3;
    nxNodo4 = nodi[nodeIndex].nextNode4;
    nxNodo5 = nodi[nodeIndex].nextNode5;
    nxNodo6 = nodi[nodeIndex].nextNode6;
  }
  else
  {
    contenuto = "Nodo non trovato...";
  }
  res.redirect("/");
})  //end root post function

app.post("/edit-content", function (req,res) {
  if (req.body.confirm != undefined) {
    nodi[nodeIndex].content = req.body.descriz;
    nodi[nodeIndex].title = req.body.titulo;
    nodi[nodeIndex].question = req.body.domanda;
    nodi[nodeIndex].answer1 = req.body.risp1;
    nodi[nodeIndex].answer2 = req.body.risp2;
    nodi[nodeIndex].answer3 = req.body.risp3;
    nodi[nodeIndex].answer4 = req.body.risp4;
    nodi[nodeIndex].answer5 = req.body.risp5;
    nodi[nodeIndex].answer6 = req.body.risp6;
    nodi[nodeIndex].nextNode1 = req.body.nxNodo1;
    nodi[nodeIndex].nextNode2 = req.body.nxNodo2;
    nodi[nodeIndex].nextNode3 = req.body.nxNodo3;
    nodi[nodeIndex].nextNode4 = req.body.nxNodo4;
    nodi[nodeIndex].nextNode5 = req.body.nxNodo5;
    nodi[nodeIndex].nextNode6 = req.body.nxNodo6;

    contenuto = req.body.descriz;
    titolo = req.body.titulo;
    domanda = req.body.domanda;

    risp1 = req.body.risp1;
    risp2 = req.body.risp2;
    risp3 = req.body.risp3;
    risp4 = req.body.risp4;
    risp5 = req.body.risp5;
    risp6 = req.body.risp6;
    nxNodo1 = req.body.nxNodo1;
    nxNodo2 = req.body.nxNodo2;
    nxNodo3 = req.body.nxNodo3;
    nxNodo4 = req.body.nxNodo4;
    nxNodo5 = req.body.nxNodo5;
    nxNodo6 = req.body.nxNodo6;

  }

  if (req.body.delete) {  //delete node


  } //end delete node

  if (req.body.insert) {  //insert node
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
