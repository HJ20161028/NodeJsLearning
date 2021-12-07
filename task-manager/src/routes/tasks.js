const express = require('express');
const { createTask, getTasks, getTaskById, updateTaskById, removeTaskById } = require('../models/tasks');

const router = new express.Router();

router.post('/tasks', (req, res) => {
  createTask(req.body, (newTask) => {
    res.send(newTask);
  }, (e) => {
    res.status(400).send(e);
  });
});

// get all tasks/task:id;
router.get('/tasks', (req, res) => {
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

router.get('/tasks/:id', (req, res) => {
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

// update task by id;
router.patch('/tasks/:id', (req, res) => {
  const _id = req.params.id;
  const updating = Object.keys(req.body);
  const allowUpdates = ["description", "completed"];
  const isValidUpdate = updating.every((key) => allowUpdates.includes(key));

  if (!isValidUpdate) {
    return res.status(400).send("Error: Invalid updating props. Just allow updating 'description,completed'.");
  }

  updateTaskById(_id, req.body, (task) => {
    res.send(task);
  }, (e) => {
    res.status(500).send(e);
  })
});

router.delete('/tasks/:id', (req, res) => {
  const _id = req.params.id;
  removeTaskById(_id, (task) => {
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  }, (e) => {
    res.status(500).send(e);
  });
});

module.exports = router;