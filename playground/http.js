const http = require("http");

const url = 'http://api.weatherstack.com/current?access_key=84df01d272e11a4cdad8f2c860a83c16&query=Beijing';

const req = http.request(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk.toString();
  });

  res.on('end', () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

req.end();