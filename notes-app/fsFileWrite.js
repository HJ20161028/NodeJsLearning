const fs = require('fs');

fs.writeFileSync('notes.txt', 'My name is HJ!')

// append msg to notes.txt;
try {
  fs.appendFileSync('notes.txt', '\n This message was appended by nodeJs');
  console.log('The "new msg" was appended to file!');
} catch (err) {
  /* Handle the error */
}
