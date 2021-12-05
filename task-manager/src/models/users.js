const mongoose = require('mongoose');
const validator = require('validator');

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

function createUser(user, successCallback, errorCallback) {
  const newUser = new User(user);
  newUser.save().then(() => {
    if (successCallback) {
      successCallback(newUser);
    } else {
      console.log('New user created successful:' + newUser );
    }
  }).catch((e) => {
    if (errorCallback) {
      errorCallback(e);
    } else {
      console.log(e);
    }
  });
}

module.exports = {
  User,
  createUser,
}