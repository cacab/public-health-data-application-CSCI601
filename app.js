const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
let mysql = require('mysql');
let populations;
const router = express.Router();

let connection = mysql.createConnection({
  user: 'caitlin',
  host: 'localhost',
  database: '601_project',
  password: 'm********',
});
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

});
// do not remove below
let createTodos = "SELECT * FROM irsincomebyzipcode;"

  connection.query(createTodos, function(err, results, fields) {
   // console.log(results);
    //('#test').html(JSON.stringify(results));

    if (err) {
      console.log(err.message);
    }
  });
/*  connection.end(function(err) {
    if (err) {
      return console.log(err.message);
    }

  });*/

// do not remove above

app.get("/",(req, results) => {
  results.sendFile(__dirname + "/index.html");
  console.log('Accessing the secret section ...')
});

//routes

app.get('/lowincomebyzip', (req, res) =>{
  let dataSent = [];
  connection.query("SELECT hospitalGeneralInformation.facility_name, hospitalGeneralInformation.city, hospitalGeneralInformation.state, address, hospital_overall_rating \n" +
      "FROM hospitalGeneralInformation JOIN irsincomebyzipcode\n" +
      "WHERE hospital_overall_rating <= 3 AND avg_agi <= 67565 AND hospitalGeneralInformation.zipcode = irsincomebyzipcode.zipcode\n" +
      "ORDER BY hospital_overall_rating;  " ,(error, results) => {
    if (error) {
      throw error
    }
    dataSent.push(results);
    res.json(dataSent);
   console.log(results);
  })


});

app.get('/highincomebyzip', (req, res) =>{
  let dataSent2 = [];
  connection.query("SELECT hospitalGeneralInformation.facility_name, hospitalGeneralInformation.city, hospitalGeneralInformation.state, address, hospital_overall_rating \n" +
      "FROM hospitalGeneralInformation JOIN irsincomebyzipcode\n" +
      "WHERE hospital_overall_rating > 3 AND avg_agi < 67565 AND hospitalGeneralInformation.zipcode = irsincomebyzipcode.zipcode\n" +
      "ORDER BY hospital_overall_rating;  " ,(error, results) => {
    if (error) {
      throw error
    }
    dataSent2.push(results);
    res.json(dataSent2);
    console.log(results);
  })
  connection.end(function(err) {
    if (err) {
      return console.log(err.message);
    }

  });

})



app.use(express.static(__dirname + '/HTML'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/CSS'));
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/index.html'));

app.listen(8080, () => {console.log(" Caitlin's 601 project is running on port 8080");});
