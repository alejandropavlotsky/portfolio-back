const express = require('express');
const cors = require('cors')
const helmet = require('helmet');
const app = express();
const path = require('path');
app.use(helmet());
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')));
const port = process.env.PORT || 3001

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
  }
}));


const projects = require('./projects.json');

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '/index.html'));
})
app.get('/api/projects', (req, res) => {
  res.json(projects);
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})