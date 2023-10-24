var express = require("express");
var router = express.Router();

var jugadores;
var tablero;
var turno;

const marcas = ["x", "o"];

function buscarGanador() {
  var ganador;
  var iguales;

  // Verificar filas
  for (var fila = 0; fila < 3; fila++) {
    iguales = true;
    for (var columna = 0; columna < 3; columna++) {
      iguales = iguales && tablero[fila][columna] == marcas[turno];
    }
    if (iguales) {
      ganador = turno;
      return ganador;
    }
  }

  // Verificar columnas
  for (var columna = 0; columna < 3; columna++) {
    iguales = true;
    for (var fila = 0; fila < 3; fila++) {
      iguales = iguales && tablero[fila][columna] == marcas[turno];
    }
    if (iguales) {
      ganador = turno;
      return ganador;
    }
  }

  // Verificar diagonal principal
  iguales = true;
  for (var i = 0; i < 3; i++) {
    iguales = iguales && tablero[i][i] == marcas[turno];
  }
  if (iguales) {
    ganador = turno;
    return ganador;
  }

  // Verificar diagonal secundaria
  iguales = true;
  for (var i = 0; i < 3; i++) {
    iguales = iguales && tablero[i][2 - i] == marcas[turno];
  }
  if (iguales) {
    ganador = turno;
    return ganador;
  }

  return ganador; // Devolver ganador o undefined si no hay ganador
}

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express listening" });
});

router.put("/empezar", function (request, response) {
  turno = 0;
  try {
    jugadores = request.body.jugadores;
    tablero = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
    response.setHeader("Content-Type", "application/json");
    response.send({ turno: jugadores[turno], tablero: tablero });
  } catch (error) {
    console.log(error);
  }
});

router.put("/movimiento", function (request, response) {
  const columna = request.body.columna;
  const fila = request.body.fila;

  tablero[fila][columna] = marcas[turno];
  var ganador = buscarGanador();
  turno = (turno + 1) % 2;

  response.setHeader("Content-Type", "application/json");
  if (isNaN(ganador)) {
    response.send({ turno: jugadores[turno], tablero: tablero });
  } else {
    response.send({ ganador: jugadores[ganador], tablero: tablero });
  }
});

module.exports = router;
