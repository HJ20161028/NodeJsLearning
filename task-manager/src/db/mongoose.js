const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
}, (err) => {
  console.log(err);
});

const User = mongoose.model('User', {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
    validate: (val) => {
      if (val < 0) {
        throw new Error('Age must be a positive number.');
      }
    }
  },
  email: {
    type: String,
    trim: true,
    required: true,
    validate: (val) => {
      if (!validator.isEmail(val)) {
        throw new Error('Email is invalid.');
      }
    }
  },
  password: {
    type: String,
    trim: true,
    minlength: 7,
    validate: (val) => {
      if (val && val.toLowerCase().indexOf('password') > -1) {
        throw new Error('Password should not contain words like password');
      }
    }
  }
});

// const me = new User({
//   name: 'Tom',
//   age: 20,
//   email: 'tom.test@qq.io',
//   password: 'pass-tom',
// });

// me.save().then(() => {
//   console.log(me);
// }).catch((err) => {
//   console.log('Error:', err);
// });

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

const learning = new Task({
  description: '  Learning nodejs every day.  ',
});

learning.save().then(() => {
  console.log(learning);
}).catch((e) => {
  console.log(e);
});