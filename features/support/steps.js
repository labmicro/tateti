const pactum = require('pactum');
const { Then, When } = require('@cucumber/cucumber')

let spec = pactum.spec();

When('Juan y Pedro empiezan una nueva partida', async function () {
    await spec.put('http://localhost:8000/empezar')
        .withJson({ jugadores: ["Juan", "Pedro"] })
        .toss()

    spec.response().should.have.status(200);
    spec.response().should.have.headerContains("content-type", "application/json")
});

Then('le toca mover a Juan', function () {
    spec.response().should.have.json("turno", "Juan");
});

Then('el tablero esta vacio', function () {
    spec.response().should.have.json("tablero", [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ]);
});

