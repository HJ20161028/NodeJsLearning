require('./mongoose');
const { Task } = require('../models/tasks');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// remove 'read' task and count incomplete tasks;
// Task.findByIdAndRemove('61a8c11dd125102d4029cf06').then(() => {
//   return Task.find({ completed: false });
// }).then((incompleteTasks) => {
//   console.log(incompleteTasks.length)
// }).catch((e) => {
//   console.log(e);
// });

// count function;
// Task.count({ completed: false }).then((resp) => {
//   console.log(resp);
// });

// use async/await, 61acc0b6957ef80b68249660;
const removeAndCount = async(id) => {
  try {
    await Task.findByIdAndRemove(id);
    const count = await Task.count({ completed: false });
    return count;
  } catch(e) {
    console.log(e);
  }
}

// removeAndCount('61acc0b6957ef80b68249660').then((count) => {
//   console.log(count);
// })

// bcrypt: encode password one way(can't be decode);
const bcryptTest = async() => {
  const password = 'test123!';
  const hashedPassword = await bcrypt.hash(password, 8);
  console.log('password:', password);
  console.log('hashed password:', hashedPassword);
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log('isMatch:', isMatch);
}

// bcryptTest();
const jwtTest = () => {
  const token = jwt.sign({ id: 'test123' }, 'secret123');
  console.log(token);
  const data = jwt.verify(token, 'secret123');
  console.log(data);
}

jwtTest();