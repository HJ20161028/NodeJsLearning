const add = (firstAddend, secondAddend, callback) => {
  const sum = firstAddend + secondAddend;
  setTimeout(() => {
    callback(sum);
  }, 2000);
}

add(1, 4, (data) => {
  console.log(data);
})