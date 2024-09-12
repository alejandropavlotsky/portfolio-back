const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors())
app.use(express.json())

const projects = require('./projects.json');

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

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