var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Caitlin Cabreras 601 Project'});
});



router.get('/', function(req, res, next) {
  res.render(express.query ('index', "SELECT * FROM irsincomebyzipcode"));
});
module.exports = router;
