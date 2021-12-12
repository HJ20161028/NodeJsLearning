const express = require('express');
const { User, createUser, getUsers, updateUserById, removeUserById } = require('../models/users');
const auth = require('../middleware/auth');

const router = new express.Router();

router.get('/test', (req, res) => {
  res.send('From user route.')
});

router.get('/users/me', auth, (req, res) => {
  res.send(req.user);
});

router.get('/users/:id', (req, res) => {
  const _id = req.params.id;
  User.findById(_id).then((u) => {
    if (!u) {
      return res.status(404).send();
    }
    res.send(u);
  }).catch((e) => {
    res.status(500).send(e);
  });
});

router.post('/users', async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    const token = await newUser.generateAuthToken();
    res.send({ user: newUser, token });
  } catch(e) {
    res.status(400).send(e);
  }
});

// update user by Id;
router.patch('/users/:id', (req, res) => {
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

// remove user;
router.delete('/users/:id', (req, res) => {
  const _id = req.params.id;
  removeUserById(_id, (user) => {
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  }, (e) => {
    res.status(500).send(e);
  });
});

// login
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch(e) {
    res.status(400).send(e);
  }
});

module.exports = router;