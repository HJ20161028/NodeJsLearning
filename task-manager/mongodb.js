// CRUD create read update delete;
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

mongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!');
  }

  // console.log('Connected conrectly.')
  const db = client.db(databaseName);
  // db.collection('users').insertOne({
  //   name: 'Jin',
  //   age: 28,
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert user!');
  //   }

  //   console.log(result);
  // });
  /*
  * Insert Many:
  */
  // db.collection('users').insertMany([
  //   { name: 'Yun', age: 26 },
  //   { name: 'Jen', age: 20 }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Insert Users Failed.');
  //   }

  //   console.log(result);
  // });
  // Challenge: task collection to insert 3 records;
  const taskList = [
    { description: 'Running', completed: true },
    { description: 'Reading', completed: true },
    { description: 'Learning', completed: false },
  ];
  db.collection('tasks').insertMany(taskList, (err, result) => {
    if (error) {
      return console.log('Insert tasks failed.');
    }

    console.log('Insert successful:', result);
  });
});