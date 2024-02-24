var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  /* #swagger.tags = ['Home']
  #swagger.description = 'Endpoint to retrieve the home page.' 
  */
  res.render('index', { title: 'Express' });
});

module.exports = router;
