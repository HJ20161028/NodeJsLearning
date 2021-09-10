const { getWeatherByLocation } = require('./utils/weatherService');

var arguments = process.argv.splice(2);
console.log(arguments);
const locations = arguments && arguments.join(';')

getWeatherByLocation(locations || 'Shanghai', (error, data) => {
  console.log('error:', error);
  console.log('data:', data);
});
