const name = 'Mike';

const add = function (a, b) {
  return a + b;
}

function getNotes(notes) {
  return console.log(notes);
}

module.exports = {
  getNotes,
  add,
  name,
};