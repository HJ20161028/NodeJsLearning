console.log('JS has loaded.');

fetch('http://puzzle.mead.io/puzzle').then((resp) => {
  // console.log(resp);
  if (resp.ok) {
    resp.json().then((data) => {
      console.log(data);
    });
  }
});

fetch('http://localhost:3000/weather?address=boston').then((resp) => {
  if (resp.ok) {
    resp.json().then((data) => {
      console.log(data);
    });
  }
});