const fs = require('fs');
const path = require("path");

function readNote(chalk, title) {
  const notes = loadNotes();
  const note = notes.find((item) => item.title === title);
  if (note) {
    console.log(chalk.green(title), note.body);
  } else {
    console.log(chalk.red('No note found.'))
  }
}

function getNotes(chalk) {
  const notes = loadNotes();
  const notesTitles = notes.map((item) => item.title).join(', ');
  return console.log(chalk.green(notesTitles));
}

function addNote(title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(function(note){
    return note.title == title;
  });
  if (duplicateNotes.length === 0) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log('new notes added!');
  } else {
    console.log('This title is alrady in used.');
  }
}

function loadNotes() {
  try {
    // const dataBuffer = fs.readFileSync('notes.json');
    const dataBuffer = fs.readFileSync(path.resolve(__dirname, "./notes.json"));
    const dataJson = JSON.parse(dataBuffer.toString());
    return dataJson;
  } catch (e) {
    return [];
  }
}

function saveNotes(notes) {
  const dataJson  = JSON.stringify(notes);
  const filePath = path.resolve(__dirname, "./notes.json");
  fs.writeFileSync(filePath, dataJson);
}

function removeNote(title, successCallback, errorCallback) {
  const notes = loadNotes();
  const index = notes.findIndex((item) => item.title === title);
  if (index > -1) {
    // should consider of duplicate tiltes, try another logic:
    const notesToKeep = notes.filter((item ) => item.title !== title);
    saveNotes(notesToKeep);
    successCallback && successCallback();
  } else {
    errorCallback && errorCallback();
  }
}

module.exports = {
  getNotes,
  addNote,
  removeNote,
  readNote,
};