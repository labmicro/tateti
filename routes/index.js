var express = require('express');
var router = express.Router();

var jugadores;
var tablero;
var turno;

const marcas = ['x', 'o'];

function buscarGanador() {
  var ganador;
  var iguales;
  for (var indice = 0; indice < 3; indice++) {
    iguales = true;
    for (var celda = 0; celda < 3; celda++) {
      iguales = iguales && (tablero[celda][indice] == marcas[turno])
    }
    if (iguales) {
      ganador = turno;
      break;
    }
  }
  return ganador
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/empezar', function (request, response) {
  turno = 0;
  jugadores = request.body.jugadores;
  tablero = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];

  response.setHeader('Content-Type', 'application/json');  
  response.send({turno: jugadores[turno], tablero: tablero});
});

router.put('/movimiento', function (request, response) {
  const columna = request.body.columna;
  const fila = request.body.fila;

  tablero[fila][columna] = marcas[turno];
  var ganador = buscarGanador();
  turno = (turno + 1) % 2;

  response.setHeader('Content-Type', 'application/json');  
  if (isNaN(ganador)) {
    response.send({ turno: jugadores[turno], tablero: tablero });
  } else {
    response.send({ ganador: jugadores[ganador], tablero: tablero });
  }

});

module.exports = router;
