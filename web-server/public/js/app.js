
// fetch('http://puzzle.mead.io/puzzle').then((resp) => {
//   // console.log(resp);
//   if (resp.ok) {
//     resp.json().then((data) => {
//       console.log(data);
//     });
//   }
// });

// fetch('http://localhost:3000/weather?address=boston').then((resp) => {
//   if (resp.ok) {
//     resp.json().then((data) => {
//       console.log(data);
//     });
//   }
// });

function queryWeather(callback) {
  const weatherForm = document.querySelector('.weather-form');
  const locationInput = document.querySelector('.location-input');
  const oMessage = document.querySelector('#message');
  weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = 'http://localhost:3000/weather?address=' + locationInput.value;
    oMessage.textContent = 'Fetching Data...';
    fetch(url).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          callback && callback(data);
        });
      }
    });
  })
}

queryWeather((data) => {
  const oMessage = document.querySelector('#message');
  console.log(data);
  oMessage.textContent = 'Location:' + data.location.name + ' temperature is ' + data.current.temperature;
})