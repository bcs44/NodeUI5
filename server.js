
//Constantes
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const db = require('./config/db');
const port = 7000;

var app = express();

app.use(express.static(__dirname));
app.configure(function () {
    app.use(express.logger('dev'));  
    app.use(express.bodyParser());
});


MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)

  

  require('./routes')(app, database);

  app.listen(port, () => {
    console.log('Servidor ativo na porta: ' + port);
  });


  database.collection('docdata', {strict:true}, function(err, collection) {
    console.log("entrou");
    if (err) {
        console.log("The 'docdata' collection doesn't exist.");
    }
});



})



