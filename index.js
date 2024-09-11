const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json())
const port = 3001;

const projects = require('./projects.json');


app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})