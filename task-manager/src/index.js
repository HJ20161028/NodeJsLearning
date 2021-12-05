const express = require('express');
require('./db/mongoose');
const { User, createUser } = require('./models/users');
const { Task, createTask } = require('./models/tasks');

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

app.get('/users', (req, res) => {
  User.find({}).then((resp) => {
    res.send(resp);
  }).catch((e) => {
    res.send(e);
  });
});

app.get('/users/:id', (req, res) => {
  const _id = req.params.id;
  User.findById(_id).then((u) => {
    if (!u) {
      return res.status(404).send();
    }
    res.send(u);
  }).catch((e) => {
    res.status(500).send(e);
  });
})

// get all tasks/task:id;
app.get('/tasks', (req, res) => {
  Task.find({}).then((tasks) => {
    res.send(tasks);
  }).catch(() => {
    res.status(500).send();
  });
});

app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;
  Task.findById(_id).then((task) => {
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  }).catch(() => {
    res.status(500).send();
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
})