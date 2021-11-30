// CRUD create read update delete;
// const mongodb = require("mongodb");
// const mongoClient = mongodb.MongoClient;

const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
// const id = new ObjectId();
// console.log(id);
// console.log(id.getTimestamp());
// console.log(id.id);
// console.log(id.id.length);
// console.log(id.toHexString().length);

// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//   if (error) {
//     return console.log('Unable to connect to database!');
//   }

//   // console.log('Connected conrectly.')
//   // const db = client.db(databaseName);
//   // 1. Insert one.
//   // db.collection('users').insertOne({
//   //   _id: id,
//   //   name: 'YunJin',
//   //   age: 26,
//   // }, (error, result) => {
//   //   if (error) {
//   //     return console.log('Unable to insert user!');
//   //   }

//   //   console.log(result);
//   // });
//   /*
//   * 2.Insert Many:
//   */
//   // db.collection('users').insertMany([
//   //   { name: 'Yun', age: 26 },
//   //   { name: 'Jen', age: 20 }
//   // ], (error, result) => {
//   //   if (error) {
//   //     return console.log('Insert Users Failed.');
//   //   }

//   //   console.log(result);
//   // });
//   // Challenge: task collection to insert 3 records;
//   // const taskList = [
//   //   { description: 'Running', completed: true },
//   //   { description: 'Reading', completed: true },
//   //   { description: 'Learning', completed: false },
//   // ];
//   // db.collection('tasks').insertMany(taskList, (err, result) => {
//   //   if (error) {
//   //     return console.log('Insert tasks failed.');
//   //   }

//   //   console.log('Insert successful:', result);
//   // });
// });

const client = new MongoClient(connectionURL, { useNewUrlParser: true });
async function run() {
  try {
    await client.connect();
    const database = client.db(databaseName);
    const users = database.collection("users");
    // Query a user by name;
    const query = { name: "YunJin" };
    const options = {
      // sort matched documents in descending order by rating
      // sort: { "imdb.rating": -1 },
      // Include only the `title` and `imdb` fields in the returned document
      // projection: { _id: 0, title: 1, imdb: 1 },
    };
    const user = await users.findOne(query, options);
    // since this method returns the matched document, not a cursor, print it directly
    console.log(user);

    // fetch task list by id and query uncompleted tasks;
    const lastTask = await database.collection('tasks').findOne({ _id: ObjectId("61a4d5e8c3604504f38e5b07") });
    console.log(lastTask);
    const uncompletedTasks = await database.collection('tasks').findOne({ completed: false });
    console.log(uncompletedTasks);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);