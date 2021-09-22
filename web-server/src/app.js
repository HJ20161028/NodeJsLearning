const path = require('path');
const express = require('express');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
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

// use hbs template instead.
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jin'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    msg: 'If you have any questions, please contact me by email: Jin.He@perkinelmer.com',
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
