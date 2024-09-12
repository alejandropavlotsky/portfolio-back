const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
app.use(cors())
app.use(express.json())

app.use(express.static('dist'))
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        // Bloqueo por defecto
        defaultSrc: ["'none'"],
        // Permitir la carga de imágenes desde el servidor propio (self)
        imgSrc: ["'self'", 'https://portfolio-alejandro-murawczik.onrender.com'],
        // Otros recursos como scripts o estilos se pueden configurar aquí
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        // Permitir conexiones de fuentes (en caso de que uses APIs)
        connectSrc: ["'self'"],
      },
    },
  })
);

const projects = require('./projects.json');

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>');
})

app.get('/api/projects', (request, response) => {
  response.json(projects);
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

const port = 3001;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})