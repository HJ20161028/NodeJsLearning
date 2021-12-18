const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }
}, {
  timestamps: true,
});

taskSchema.pre('save', function(next) {
  const task = this;
  console.log('Just before task save.');
  next();
});

const Task = mongoose.model('Task', taskSchema);

async function createTask(task, successCallback, errorCallback) {
  const newTask = new Task(task);
  // newTask.save().then(() => {
  //   if (successCallback) {
  //     successCallback(newTask);
  //   }
  // }).catch((e) => {
  //   if (errorCallback) {
  //     errorCallback(e);
  //   }
  // });
  try {
    await newTask.save();
    if (successCallback) {
      successCallback(newTask);
    }
  } catch(e) {
    if (errorCallback) {
      errorCallback(e);
    }
  }
}

async function getTasks(query, successCallback, errorCallback) {
  try {
    const tasks = await Task.find(query);
    if (successCallback) {
      successCallback(tasks);
    }
  } catch(e) {
    if (errorCallback) {
      errorCallback(e);
    }
  }
}

async function getTaskById(query, successCallback, errorCallback) {
  try {
    const task = await Task.findOne(query);
    if (successCallback) {
      successCallback(task);
    }
  } catch(e) {
    if (errorCallback) {
      errorCallback(e);
    }
  }
}

async function updateTaskById(query, updatingProps, successCallback, errorCallback) {
  try {
    // const task = await Task.findByIdAndUpdate(id, updatingProps, { new: true, runValidators: true });
    const task = await Task.findOne(query);
    if (!task) {
      throw new Error('Task not found');
    }
    Object.assign(task, updatingProps);
    await task.save();
    if (successCallback) {
      successCallback(task);
    }
  } catch(e) {
    if (errorCallback) {
      errorCallback(e);
    }
  }
}

async function removeTaskById(query, successCallback, errorCallback) {
  try {
    const task = await Task.findOneAndRemove(query);
    if (successCallback) {
      successCallback(task);
    }
  } catch(e) {
    if (errorCallback) {
      errorCallback(e);
    }
  }
}

module.exports = {
  Task,
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  removeTaskById,
}