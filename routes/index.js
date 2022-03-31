var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/empezar', function (request, response) {
  response.setHeader('Content-Type', 'application/json');  
  response.send({turno: 'Juan', tablero: [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ]});
});

router.put('/movimiento', function (request, response) {
  response.setHeader('Content-Type', 'application/json');  
  response.send({turno: 'Pedro', tablero: [
    ['x', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ]});
});

module.exports = router;
