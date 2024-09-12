const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

const projects = require('./projects.json');


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/projects', (request, response) => {
  response.json(projects);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});