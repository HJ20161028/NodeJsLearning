require('./mongoose');
const { Task } = require('../models/tasks');

// remove 'read' task and count incomplete tasks;
// Task.findByIdAndRemove('61a8c11dd125102d4029cf06').then(() => {
//   return Task.find({ completed: false });
// }).then((incompleteTasks) => {
//   console.log(incompleteTasks.length)
// }).catch((e) => {
//   console.log(e);
// });

// count function;
// Task.count({ completed: false }, (e, count) => {
//   console.log(count);
// });
Task.count({ completed: false }).then((resp) => {
  console.log(resp);
});