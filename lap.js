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
var autenticato = false;

var nodeIndex = 0;
var notFound = false;
var history = [];

readTreeFromJson();
var contenuto = nodi[0].content;
var nodeIndex = 0;
var nodeIndexEdit = 0;
var nodoScelto = nodi[0].nodeNumber;
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

history.push(nodi[0].nodeNumber);

// NAVIGATION FUNCTIONS

app.get("/", function(req, res) {
  //  req.sendFile(nodi[20]);
  res.render("navlap", {
    nodo: nodi[nodeIndex],
    notFound: notFound,
    history: history
  })
}) //end get function

app.post("/change-node", function(req, res) {
  switch (req.body.button) {
    case "1":
      nodeIndex = nodi.findIndex(o => o.nodeNumber === nodi[nodeIndex].nextNode1);
      break;
    case "2":
      nodeIndex = nodi.findIndex(o => o.nodeNumber === nodi[nodeIndex].nextNode2);
      break;
    case "3":
      nodeIndex = nodi.findIndex(o => o.nodeNumber === nodi[nodeIndex].nextNode3);
      break;
    case "4":
      nodeIndex = nodi.findIndex(o => o.nodeNumber === nodi[nodeIndex].nextNode4);
      break;
    case "5":
      nodeIndex = nodi.findIndex(o => o.nodeNumber === nodi[nodeIndex].nextNode5);
      break;
    case "6":
      nodeIndex = nodi.findIndex(o => o.nodeNumber === nodi[nodeIndex].nextNode6);
      break;
    default:
      console.log("button unknown");

  }
  if (nodeIndex == -1) {
    notFound = true;
  } else {
    notFound = false;
    history.push(nodi[nodeIndex].nodeNumber);
  };
  res.redirect("/");
}) //end post function change-node

app.post("/ctrl-buttons", function(req, res) {
  switch (req.body.ctrlbutton) {
    case "back":
      history.pop();
      nodeIndex = nodi.findIndex(o => o.nodeNumber === history[history.length-1]);
      break;
    case "restart":
    history = [];
    history.push(nodi[0].nodeNumber);
    nodeIndex = 0;
      break;
    case "reference":
    nodeIndex = nodi.findIndex(o => o.nodeNumber === "9045");
    history.push(9045);
    break;
    default:
      console.log("Ctrl Button not found");
  }
  res.redirect("/");
}) // end post function ctrl-buttons

// *** END NAVIGATION FUNCTIONS ***

// *** EDITING FUNCTIONS ***
app.get("/edit-node", function (req, res) {
  if (!autenticato) {
    res.render("login");
  }
  else {
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
 }
})  //end get function

app.post("/edit-node", function (req, res) {
  nodoScelto = req.body.numNodo
  nodeIndexEdit = nodi.findIndex(o => o.nodeNumber === nodoScelto);
  if (nodeIndexEdit != -1) {
    contenuto = nodi[nodeIndexEdit].content;
    titolo = nodi[nodeIndexEdit].title;
    domanda = nodi[nodeIndexEdit].question;
    risp1 = nodi[nodeIndexEdit].answer1;
    risp2 = nodi[nodeIndexEdit].answer2;
    risp3 = nodi[nodeIndexEdit].answer3;
    risp4 = nodi[nodeIndexEdit].answer4;
    risp5 = nodi[nodeIndexEdit].answer5;
    risp6 = nodi[nodeIndexEdit].answer6;
    nxNodo1 = nodi[nodeIndexEdit].nextNode1;
    nxNodo2 = nodi[nodeIndexEdit].nextNode2;
    nxNodo3 = nodi[nodeIndexEdit].nextNode3;
    nxNodo4 = nodi[nodeIndexEdit].nextNode4;
    nxNodo5 = nodi[nodeIndexEdit].nextNode5;
    nxNodo6 = nodi[nodeIndexEdit].nextNode6;
  }
  else
  {
    contenuto = "Nodo non trovato...";
  }
  res.redirect("/edit-node");
})  //end root post function

app.post("/edit-content", function (req,res) {
  if (req.body.confirm != undefined) {
    nodi[nodeIndexEdit].content = req.body.descriz;
    nodi[nodeIndexEdit].title = req.body.titulo;
    nodi[nodeIndexEdit].question = req.body.domanda;
    nodi[nodeIndexEdit].answer1 = req.body.risp1;
    nodi[nodeIndexEdit].answer2 = req.body.risp2;
    nodi[nodeIndexEdit].answer3 = req.body.risp3;
    nodi[nodeIndexEdit].answer4 = req.body.risp4;
    nodi[nodeIndexEdit].answer5 = req.body.risp5;
    nodi[nodeIndexEdit].answer6 = req.body.risp6;
    nodi[nodeIndexEdit].nextNode1 = req.body.nxNodo1;
    nodi[nodeIndexEdit].nextNode2 = req.body.nxNodo2;
    nodi[nodeIndexEdit].nextNode3 = req.body.nxNodo3;
    nodi[nodeIndexEdit].nextNode4 = req.body.nxNodo4;
    nodi[nodeIndexEdit].nextNode5 = req.body.nxNodo5;
    nodi[nodeIndexEdit].nextNode6 = req.body.nxNodo6;

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

  res.redirect("/edit-node");
})  // end post new-content function

app.post("/confirm", function(req, res) {
  writeTreeToJson();
  res.redirect("/edit-node");
})  //end post confirm-all function

app.post("/authenticate", function(req, res) {
  if(req.body.psw === "mantuamegenuit") {
    autenticato = true;
  }
  res.redirect("/edit-node");
})

// *** END EDITING FUNCTIONS ***


// *** COMMON FUNCTIONS ***

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000.");
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
  autenticato = false;  // resetto l'autenticazione
} // end function readTreeFromJson
