const request = require('request');

const getWeatherByLocation = (location, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=84df01d272e11a4cdad8f2c860a83c16&query=' + location;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the weather server!', undefined);
    }
    else if (body.error) {
      callback(body.error.info, undefined);
    }
    else {
      callback('Successful!', {
        latitude: body.location.lat,
        longitude: body.location.lon,
        location: body.location.name,
      })
    }
  });
}

module.exports = {
  getWeatherByLocation,
}