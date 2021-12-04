const express = require('express');
require('./db/mongoose');
const { createUser } = require('./models/users');
const { createTask } = require('./models/tasks');

const app = express();

const port = process.env.PORT || '3000';

app.use(express.json());

app.post('/users', (req, res) => {
  createUser(req.body, (newUser) => {
    res.send(newUser);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/tasks', (req, res) => {
  createTask(req.body, (newTask) => {
    res.send(newTask);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
})