const express = require('express');
require('./db/mongoose');
const { User, createUser, getUsers, updateUserById } = require('./models/users');
const { Task, createTask, getTasks, getTaskById } = require('./models/tasks');
const { ObjectId } = require('bson');

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
  // User.find({}).then((resp) => {
  //   res.send(resp);
  // }).catch((e) => {
  //   res.send(e);
  // });
  getUsers({}, (users) => {
    res.send(users);
  }, (e) => {
    res.status(500).send(e);
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
  // Task.find({}).then((tasks) => {
  //   res.send(tasks);
  // }).catch(() => {
  //   res.status(500).send();
  // });
  getTasks({}, (tasks) => {
    res.send(tasks);
  }, (e) => {
    res.status(500).send();
  })
});

app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;
  // Task.findById(_id).then((task) => {
  //   if (!task) {
  //     return res.status(404).send();
  //   }
  //   res.send(task);
  // }).catch(() => {
  //   res.status(500).send();
  // });
  getTaskById(_id, (task) => {
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  }, (e) => {
    res.status(500).send();
  });
});

// update user by Id;
app.patch('/users/:id', (req, res) => {
  const _id = req.params.id;
  const updating = Object.keys(req.body);
  const allowUpdates = ["name", "age", "email", "password"];
  const isValidUpdate = updating.every((key) => allowUpdates.includes(key));

  if (!isValidUpdate) {
    return res.status(400).send("Error: Invalid updating props. Just allow updating 'name,age,email,password'.");
  }

  updateUserById(_id, req.body, (user) => {
    res.send(user);
  }, (e) => {
    res.status(500).send(e);
  })
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
})