const express = require('express');
const { createTask, getTasks, getTaskById, updateTaskById, removeTaskById } = require('../models/tasks');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, (req, res) => {
  const task = {
    ...req.body,
    owner: req.user._id,
  }
  createTask(task, (newTask) => {
    res.send(newTask);
  }, (e) => {
    res.status(400).send(e);
  });
});

// get all tasks/task:id;
router.get('/tasks', auth, async (req, res) => {
  // getTasks({ owner: req.user._id }, (tasks) => {
  //   res.send(tasks);
  // }, (e) => {
  //   res.status(500).send();
  // })

  // use ref tasks instead;
  const match = {};
  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }
  // options for pagination and sort so on.
  const options = {};
  if (req.query.limit) {
    options.limit = parseInt(req.query.limit, 10);
    if (req.query.skip) {
      options.skip = parseInt(req.query.skip, 10);
    }
  }
  // sort function;
  if (req.query.sortBy) {
    const sort = req.query.sortBy.split(':');
    options.sort = {
      [sort[0]]: sort[1] === 'desc' ? -1 : 1, // createdAt:desc;
    }
  }
  try {
    await req.user.populate({
      path: 'tasks',
      match,
      options: options,
    }).execPopulate();
    res.send(req.user.tasks);
  } catch(e) {
    res.status(404).send();
  }

});

// Can only get auth user's task;
router.get('/tasks/:id', auth, (req, res) => {
  const _id = req.params.id;
  getTaskById({ _id, owner: req.user._id }, (task) => {
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  }, (e) => {
    res.status(500).send();
  });
});

// update task by id;
router.patch('/tasks/:id', auth, (req, res) => {
  const _id = req.params.id;
  const updating = Object.keys(req.body);
  const allowUpdates = ["description", "completed"];
  const isValidUpdate = updating.every((key) => allowUpdates.includes(key));

  if (!isValidUpdate) {
    return res.status(400).send("Error: Invalid updating props. Just allow updating 'description,completed'.");
  }

  updateTaskById({ _id, owner: req.user._id }, req.body, (task) => {
    res.send(task);
  }, (e) => {
    res.status(500).send(e);
  })
});

router.delete('/tasks/:id', auth, (req, res) => {
  const _id = req.params.id;
  removeTaskById({ _id, owner: req.user._id }, (task) => {
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  }, (e) => {
    res.status(500).send(e);
  });
});

module.exports = router;