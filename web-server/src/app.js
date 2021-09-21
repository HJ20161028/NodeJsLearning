const path = require('path');
const express = require('express');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// app.get('', (req, res) => {
//   res.send('<h1>Hello Express!</h1>');
// });

// app.get('/help', (req, res) => {
//   res.send('Help page.')
// });

// app.get('/about', (req, res) => {
//   res.send([{
//     name: 'Jin',
//     age: 28,
//   }, {
//     location: 'Shanghai',
//     forecast: 'Sunny',
//   }]);
// });

// app.get('/weather', (req, res) => {
//   res.send('Weather page.');
// });

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
