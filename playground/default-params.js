const greeter = (name = 'User') => {
  console.log('Hello ' + name + "!");
}

// greeter('Jin');
// use default value avoid program crash.
const transaction = (type, { label = 'L', stock = 0 } = {}) => {
  console.log(type, label, stock);
}

transaction();