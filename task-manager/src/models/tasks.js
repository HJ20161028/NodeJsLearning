const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

function createTask(task, successCallback, errorCallback) {
  const newTask = new Task(task);
  newTask.save().then(() => {
    if (successCallback) {
      successCallback(newTask);
    }
  }).catch((e) => {
    if (errorCallback) {
      errorCallback(e);
    }
  });
}

module.exports = {
  Task,
  createTask,
}