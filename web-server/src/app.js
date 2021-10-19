const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { getWeatherByLocation } = require('./utils/weatherService');

const app = express();
// Define paths for Express config;
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

// Setup handlebars engine and views location;
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve;
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

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address term.'
    });
  }
  // return res.send({
  //   forecast: 'It is raining',
  //   location: 'Shanghai',
  //   address: req.query.address,
  // });
  // use weather api to get forecast;
  getWeatherByLocation(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    return res.send(data);
  })
});

// use hbs template instead.
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jin'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Miss Feng'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    msg: 'If you have any questions, please contact me by email: Jin.He@perkinelmer.com',
    name: 'Mr Wang'
  })
});

app.get('/help/*', (req, res) => {
  // res.send('Help child page not found.');
  res.render('notFound', {
    title: '404 not found page',
    errorMsg: 'Help article not found.',
    name: 'Jin'
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term."
    })
  }
  res.send({
    products: [],
  });
});

app.get('*', (req, res) => {
  // res.send('My 404 page.');
  res.render('notFound', {
    title: '404 not found page',
    errorMsg: 'Page not found.',
    name: 'Jin'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
