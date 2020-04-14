var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();


// Create a connection to the database
//var connection = mysql.createConnection();{

function getMySQLConnection() {
  return mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'moonflame',
    database : '601_project'
  });
}





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');






app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;






app.get('/income', function(req, res) {
  var incomeList = [];

  // Connect to MySQL database.
  var connection = getMySQLConnection();
  connection.connect();

  // Do the query to get data.
  connection.query('SELECT * FROM irsincomebyzipcode', function(err, rows, fields) {
    if (err) {
      res.status(500).json({"status_code": 500,"status_message": "internal server error"});
    } else {
      console.log("connected???");
      // Loop check on each row
      for (var i = 0; i < rows.length; i++) {

        // Create an object to save current row's data
        var income = {
          'state':rows[i].state,
          'zipcode':rows[i].zipcode,
          'numreturns':rows[i].numreturns,
          'AGI':rows[i].AGI
        }
        // Add object into array
        incomeList.push(income);
      }

      // Render index.pug page using array
      res.render('www', {"personList": incomeList});
      res.render('index', {"personList": incomeList});


    }
  });

  // Close the MySQL connection
  connection.end();

});



