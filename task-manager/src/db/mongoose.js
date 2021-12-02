const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
}, (err) => {
  console.log(err);
});

// const User = mongoose.model('User', {
//   name: String,
//   age: Number,
// });

// const me = new User({
//   name: 'AdobeHJ',
//   age: 28,
// });

// me.save().then(() => {
//   console.log(me);
// }).catch((err) => {
//   console.log('Error:', err);
// });

const Task = mongoose.model('Task', {
  description: String,
  completed: Boolean,
});

const reading = new Task({
  description: 'Read a book every month.',
  completed: false,
});

reading.save().then(() => {
  console.log(reading);
}).catch((e) => {
  console.log(e);
});