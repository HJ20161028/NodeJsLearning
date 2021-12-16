const express = require('express');
require('./db/mongoose');
const userRouter = require('./routes/users');
const taskRouter = require('./routes/tasks');

const app = express();

const port = process.env.PORT || '3000';

// middleware function;

// app.use((req, res, next) => {
//   res.status(503).send('Website is upgarding...')
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
})

const { User } = require('./models/users');
const { Task } = require('./models/tasks');

const entityAssociate = async () => {
  // const task = await Task.findById('61bb335f6af35706582814bb');
  // await task.populate('owner').execPopulate();
  // console.log(task.owner);

  const user = await User.findById('61bb333a6af35706582814b5');
  await user.populate('tasks').execPopulate();
  console.log(user.tasks);
}

// entityAssociate();