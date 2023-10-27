const { setWorldConstructor, setDefaultTimeout, World, Before, BeforeAll, After } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const { execSync } = require('child_process');

class CustomWorld extends World {
  driver = null;

  constructor(options) {
    super(options)
  }

  async init() {
    this.driver = await new Builder().forBrowser("chrome").build();
  }
}

setDefaultTimeout(3 * 1000);

setWorldConstructor(CustomWorld);

BeforeAll(async function () {
  execSync('cd client && npm install && npm run build');
});

Before(async function () {
  await this.init();
});


After(function () {
  return this.driver.quit();
});