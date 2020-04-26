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
  password: 'moonflame',
});
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

});

let createTodos = "SELECT * FROM irsincomebyzipcode;"

  connection.query(createTodos, function(err, results, fields) {


    if (err) {
      console.log(err.message);
    }
  });


app.get("/",(req, results) => {
  results.sendFile(__dirname + "/index.html");
  //console.log('Accessing the secret section ...')
});

//routes




app.get('/averagerating', (req, res) =>{
  let dataSent = [];
  connection.query("SELECT AVG(hospital_overall_rating)\n" +
      "FROM hospitalGeneralInformation;" ,(error, results) => {
    if (error) {
      throw error
    }
    dataSent.push(results);

    res.json(dataSent);

    //console.log(results);
  })


});





app.get('/averageagi', (req, res) =>{
  let dataSent = [];
  connection.query("SELECT AVG(avg_agi)\n" +
      "FROM irsincomebyzipcode;  " ,(error, results) => {
    if (error) {
      throw error
    }
    dataSent.push(results);
    res.json(dataSent);

  //  console.log(results);

  })


});


app.get('/averagepop', (req, res) =>{
  let dataSent = [];
  connection.query("SELECT AVG(pop_twentysixteen)\n" +
      "FROM popbyzipcode;  " ,(error, results) => {
    if (error) {
      throw error
    }
    dataSent.push(results);
    res.json(dataSent);

    //console.log(results);
  })


});



app.get('/averageslowincome', (req, res) =>{
  let dataSent = [];
  connection.query("SELECT AVG(hospital_overall_rating), AVG(pop_twentysixteen), AVG(avg_agi)\n" +
      "FROM hospitalGeneralInformation JOIN irsincomebyzipcode JOIN popbyzipcode\n" +
      "WHERE hospital_overall_rating < 3.2211 AND avg_agi < 57.3 AND hospitalGeneralInformation.zipcode = irsincomebyzipcode.zipcode AND  irsincomebyzipcode.zipcode= popbyzipcode.zipcode ; " ,(error, results) => {
    if (error) {
      throw error
    }
    dataSent.push(results);
    res.json(dataSent);

    //console.log(results);
  })


});




app.get('/lowincomebyzip', (req, res) =>{
  let dataSent = [];
  connection.query("SELECT facility_name, hospitalGeneralInformation.city, hospitalGeneralInformation.state, address, hospitalGeneralInformation.zipcode, hospital_overall_rating, pop_twentysixteen, avg_agi\n" +
      "FROM hospitalGeneralInformation JOIN irsincomebyzipcode JOIN popbyzipcode\n" +
      "WHERE hospital_overall_rating < 3.2211 AND avg_agi < 57.3 AND hospitalGeneralInformation.zipcode = irsincomebyzipcode.zipcode AND  irsincomebyzipcode.zipcode= popbyzipcode.zipcode\n" +
      "ORDER BY hospital_overall_rating; " ,(error, results) => {
    if (error) {
      throw error
    }
    dataSent.push(results);
    res.json(dataSent);

   //console.log(results);
  })


});




app.get('/averageshighincome', (req, res) =>{
  let dataSent = [];
  connection.query("SELECT AVG(hospital_overall_rating), AVG(pop_twentysixteen), AVG(avg_agi)\n" +
      "FROM hospitalGeneralInformation JOIN irsincomebyzipcode JOIN popbyzipcode\n" +
      "WHERE hospital_overall_rating > 3.2211 AND avg_agi > 57.3 AND hospitalGeneralInformation.zipcode = irsincomebyzipcode.zipcode AND  irsincomebyzipcode.zipcode= popbyzipcode.zipcode ; " ,(error, results) => {
    if (error) {
      throw error
    }
    dataSent.push(results);
    res.json(dataSent);

    //console.log(results);
  })


});



app.get('/highincomebyzip', (req, res) =>{
  let dataSent2 = [];
  connection.query("SELECT facility_name, hospitalGeneralInformation.city, hospitalGeneralInformation.state, address, hospitalGeneralInformation.zipcode, hospital_overall_rating, pop_twentysixteen, avg_agi\n" +
      "FROM hospitalGeneralInformation JOIN irsincomebyzipcode JOIN popbyzipcode\n" +
      "WHERE hospital_overall_rating > 3.2211 AND avg_agi > 57.3 AND hospitalGeneralInformation.zipcode = irsincomebyzipcode.zipcode AND  irsincomebyzipcode.zipcode= popbyzipcode.zipcode\n" +
      "ORDER BY hospital_overall_rating;  " ,(error, results) => {
    if (error) {
      throw error
    }
    dataSent2.push(results);
    res.json(dataSent2);
    //console.log(results);
  })


})


app.get('/highincomeonly', (req, res) =>{
  let dataSent = [];
  connection.query("SELECT facility_name, hospitalGeneralInformation.city, hospitalGeneralInformation.state, address, hospitalGeneralInformation.zipcode, hospital_overall_rating, pop_twentysixteen, avg_agi\n" +
      "FROM hospitalGeneralInformation JOIN irsincomebyzipcode JOIN popbyzipcode\n" +
      "WHERE  avg_agi > 57.3 AND hospitalGeneralInformation.zipcode = irsincomebyzipcode.zipcode AND  irsincomebyzipcode.zipcode= popbyzipcode.zipcode\n" +
      "ORDER BY hospital_overall_rating;   " ,(error, results) => {
    if (error) {
      throw error
    }
    dataSent.push(results);
    res.json(dataSent);

    //console.log(results);
  })


});



app.get('/averageslowincomeonly', (req, res) =>{
  let dataSent = [];
  connection.query("SELECT AVG(hospital_overall_rating), AVG(pop_twentysixteen), AVG(avg_agi)\n" +
      "FROM hospitalGeneralInformation JOIN irsincomebyzipcode JOIN popbyzipcode\n" +
      "WHERE avg_agi < 57.3 AND hospitalGeneralInformation.zipcode = irsincomebyzipcode.zipcode AND  irsincomebyzipcode.zipcode= popbyzipcode.zipcode ; " ,(error, results) => {
    if (error) {
      throw error
    }
    dataSent.push(results);
    res.json(dataSent);

    //console.log(results);
  })


});


app.get('/averageshighincomeonly', (req, res) =>{
  let dataSent = [];
  connection.query("SELECT AVG(hospital_overall_rating), AVG(pop_twentysixteen), AVG(avg_agi)\n" +
      "FROM hospitalGeneralInformation JOIN irsincomebyzipcode JOIN popbyzipcode\n" +
      "WHERE avg_agi > 57.3 AND hospitalGeneralInformation.zipcode = irsincomebyzipcode.zipcode AND  irsincomebyzipcode.zipcode= popbyzipcode.zipcode ; " ,(error, results) => {
    if (error) {
      throw error
    }
    dataSent.push(results);
    res.json(dataSent);

    //console.log(results);
  })


});


app.get('/lowincomeonly', (req, res) =>{
  let dataSent = [];
  connection.query("SELECT facility_name, hospitalGeneralInformation.city, hospitalGeneralInformation.state, address, hospitalGeneralInformation.zipcode, hospital_overall_rating, pop_twentysixteen, avg_agi\n" +
      "FROM hospitalGeneralInformation JOIN irsincomebyzipcode JOIN popbyzipcode\n" +
      "WHERE  avg_agi < 57.3 AND hospitalGeneralInformation.zipcode = irsincomebyzipcode.zipcode AND  irsincomebyzipcode.zipcode= popbyzipcode.zipcode\n" +
      "ORDER BY hospital_overall_rating;  " ,(error, results) => {
    if (error) {
      throw error
    }
    dataSent.push(results);
    res.json(dataSent);

    //console.log(results);
  })
    connection.end(function(err) {
        if (err) {
            return console.log(err.message);
        }

    });

});




app.use(express.static(__dirname + '/HTML'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/CSS'));
app.use(express.static(__dirname + '/'));


app.listen(8080, () => {console.log(" Caitlin's 601 project is running on port 8080");});
