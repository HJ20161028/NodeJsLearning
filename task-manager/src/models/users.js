const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MyTokenSecret } = require('./enumType');
const { Task } = require('./tasks');

const userSchema = mongoose.Schema({
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
    unique: true,
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
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      }
    }
  ]
});

// virtual: Associate User and Task documents;
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  return userObj;
}

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, MyTokenSecret);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
}

userSchema.statics.findByCredentials = async(email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password!');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password!');
  }
  return user;
}

userSchema.pre('save', async function(next) {
  const user = this;
  // encode password;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// when user removed, all user's tasks should be cascade removed also;
userSchema.post('remove', async function () {
  const user = this;
  await Task.deleteMany({ owner: user._id });
});

const User = mongoose.model('User', userSchema);

function createUser(user) {
  const newUser = new User(user);
  return newUser.save();
}

// use async function;
async function getUsers(query, successCallback, errorCallback) {
  try {
    const users = await User.find(query);
    if (successCallback) {
      successCallback(users);
    }
  } catch(e) {
    if (errorCallback) {
      errorCallback(e);
    }
  };
}

async function updateUserById(id, updatingProps, successCallback, errorCallback) {
  try {
    const user = await User.findById(id);
    Object.assign(user, updatingProps);
    await user.save();
    // const user = await User.findByIdAndUpdate(id, updatingProps, { new: true, runValidators: true });
    if (successCallback) {
      successCallback(user);
    }
  } catch(e) {
    if (errorCallback) {
      errorCallback(e);
    }
  }
}

async function removeUserById(id, successCallback, errorCallback) {
  try {
    const user = await User.findByIdAndRemove(id);
    if (successCallback) {
      successCallback(user);
    }
  } catch(e) {
    if (errorCallback) {
      errorCallback(e);
    }
  }
}

module.exports = {
  User,
  createUser,
  getUsers,
  updateUserById,
  removeUserById,
}