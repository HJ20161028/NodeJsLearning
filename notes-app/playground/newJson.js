const fs = require('fs');

const book = {
  title: 'Three Kingdoms',
  author: 'Shi Naian'
}

const bookString = JSON.stringify(book);

// fs.writeFileSync('newJson.json', bookString);

const jsonDataBuffer = fs.readFileSync('newJson.json');
const data = JSON.parse(jsonDataBuffer.toString());

data.name = 'HJ';
data.planet = 'Mars';
data.age = '28';

console.log(data);

fs.writeFileSync('newJson.json', JSON.stringify(data));