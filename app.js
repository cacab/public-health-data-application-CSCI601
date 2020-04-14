const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
//const { Pool } = require('mysql').Pool
let mysql = require('mysql');


//const pool = new Pool({
let connection = mysql.createConnection({
  user: 'caitlin',
  host: 'localhost',
  database: '601_project',
  password: '',
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

});

  let createTodos = "SELECT * FROM irsincomebyzipcode;"

  //app.get('/index.html', function(req,res) {
  connection.query(createTodos, function(err, results, fields) {
    console.log(results);
    //added next line
  //  results.render('index.html', {data:results, error:null});
   // console.log(results);
    if (err) {
      console.log(err.message);
    }
  });

  connection.end(function(err) {
    if (err) {
      return console.log(err.message);
    }

   // console.log(results);
  });
//});





//==========================================================================
app.use(express.static(__dirname + '/HTML'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/CSS'));
app.use(express.static(__dirname + '/'));


app.listen(8080, () => {console.log("started on port 8080");});
