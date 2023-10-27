const { Then, When } = require('@cucumber/cucumber')
const { By, until } = require('selenium-webdriver');
const { expect } = require('chai');

When('Juan y Pedro empiezan una nueva partida', async function () {
    await this.driver.get('http://localhost:8000');
});

Then('le toca mover a Juan', async function () {
    await this.driver.wait(until.elementLocated(By.id('jugador')));
    let jugador = await this.driver.findElement(By.id('jugador')).getText();
    expect(jugador).to.be.equal("Juan")
});

Then('el tablero esta vacio', async function () {
    await this.driver.wait(until.elementLocated(By.css('div.board')));
    let tablero = await this.driver.findElements(By.css('div.board > div'));

    await Promise.all(tablero.map(async (celda) => {
        let valor = await celda.getText();
        expect(valor).to.be.equal("");

        let clase = await celda.getAttribute("class");
        expect(clase).to.be.equal("square");
    }));

});

