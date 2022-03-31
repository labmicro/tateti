const chai = require("chai");
const chaiHttp = require("chai-http");
const res = require("express/lib/response");
const server = require("../app");
const should = chai.should();

chai.use(chaiHttp);

// - Cuando se inicia un juego nuevo le toca al primer jugador y el tablero esta vacio.
// - Cuando el primer jugador hace su movimiento le toca al otro jugador y la casilla 
// elegida por el primer jugardor esta ocupada.
// - Cuando el segundo jugador hace su movimiento le toca de nuevo al primer jugador y 
// las dos casillas elegidar por el primer y segundo jugador estan ocupadas con 
// marcas diferentes
// - Cuando un jugador marca tres casillas de la misma fila entonces gana
// - Cuando un jugador marca tres casillas de la misma columna entonces gana
// - Cuando un jugador marca tres casillas de las diagonales entonces gana
// - Si un jugador mueve cuando no es su turno entonces se devuelve un error y el tablero
// no cambia.
// - Cuando no quedan casillas vacias y no hay un ganador entonces hay un empate.

describe("Juego de TaTeTi", () => {    
    describe("Se empieza un juego nuevo", () => {
        it("Todos los casilleros estan vacios y le toca mover al primer jugador", (done) => {
            chai.request(server)
            .put("/empezar")
            .send({ jugadores: ['Juan', 'Pedro'] })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.to.be.json;
                res.body.should.be.a('object');
                // Le toca mover al primer jugador
                res.body.should.have.property('turno').eql('Juan');
                // Todos los casilleros estan vacios
                res.body.should.have.property('tablero').eql([
                    [' ', ' ', ' '],
                    [' ', ' ', ' '],
                    [' ', ' ', ' '],
                ]);
                done();
            })
        });
    });
});
