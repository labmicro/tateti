# Ta-Te-Ti: Un ejemplo de TDD en Express con Mocha

Este repositorio contiene un ejemplo paso a paso para el desarrollo de un servidor de backend basado en NodeJS y Express que sirve un juego de TaTeTi.

## Preparación del Entorno

1. Instalar el generador de proyectos de express ([referencia](https://expressjs.com/es/starter/generator.html))

```bash
npm install express-generator -g
```

2. Generar el proyecto express

```bash
express --no-view  --git tateti
```

2. Instalar las herramientas de testing

```bash
npm install --save-dev mocha chai nyc chai-http
```

3. Modificar el archivo `package.json` para agregar el comando de pruebas

```json
  "scripts": {
    "start": "node ./bin/www",
    "test": "mocha --reporter spec",
    "coverage": "nyc --reporter=html mocha"
  },
```

4. Instalar las herramientas para las pruebas de sistema al backend

```bash
npm install --save-dev @cucumber/cucumber pactum
```

5. Modificar el archivo `package.json` para agregar el comando de pruebas de backend

```json
  "scripts": {
    "start": "node ./bin/www",
    "test": "mocha --reporter spec",
    "test-backend": "cucumber-js",
    "coverage": "nyc --reporter=html mocha"
  },
```

6. Instalar las herramientas para las pruebas de sistema de integración

```bash
npm install --save-dev selenium-webdriver
```

7. Cambiar el nombre de la carpeta `features/support` por `features/backend`

8. Crear el archivo de configuración `cucumber.json` para definir un nuevo perfil

```json
{
   "default": {
      "import": ["features/integration/*.js"]
   },
   "backend": {
      "import": ["features/backend/*.js"]
   }
}
```

9. Modificar el archivo `package.json` para agregar el comando de pruebas de integración y corregir el comando para las pruebas de backend

```json
  "scripts": {
    "start": "node ./bin/www",
    "test": "mocha --reporter spec",
    "test-backend": "cucumber-js -p backend",
    "integration": "cucumber-js",
    "coverage": "nyc --reporter=html mocha"
  },
```

10. Crear la carpeta `features/integration` para ubicar el archivo con la las definiciones de los pasos y un archivo adicional de soporte que instancia el navegador antes de cada prueba.

## Ejecución de las pruebas 

1. Para ejecutar las pruebas unitarias con mocha
   ```bash
   npm test
   ```

2. Para generar el informe de cobertura de las pruebas unitarias

   ```bash
   npm run coverage
   ```

3. Para ejecutar las pruebas de sistema del backend
   
   1. En una consola iniciar el servidor con el comando
      ```bash
      npm start
      ```

   2. En una segunda consola ejecutar las pruebas con el comando
      ```bash
      npm run test-backend
      ```

4. Para ejecutar las pruebas de sistema de integración
   
   1. En una consola iniciar el servidor con el comando
      ```bash
      npm start
      ```

   2. En una segunda consola ejecutar las pruebas con el comando
      ```bash
      npm run integration
      ```

## Ejecucion de los servidores

1. Luego de clonar el repositorio ejecutar para inicializar el frontend:

   ```
   cd client
   npm install
   npm start
   ```

2. En otra terminal ejecutar para inicializar el backend:

   ```
   npm install
   npm start
   ```
