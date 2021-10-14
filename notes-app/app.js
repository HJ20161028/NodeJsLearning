const yargs = require('yargs');
const chalk = require('chalk');
const { getNotes, addNote, removeNote, readNote } = require('./day0523/notes.js');

yargs.version('1.1.0');

yargs.command({
  command: 'test',
  description: 'test commmand',
  handler: function (argv) {
    console.log('Test case:' + argv.case);
    console.log('Test step:' + argv.steps);
  },
  builder: {
    case: {
      description: 'Test case',
      demandOption: true,
      type: 'string',
    },
    steps: {
      decription: 'test steps',
      demandOption: true,
      type: 'string',
    }
  },
});

// add another command;

yargs.command({
  command: 'add',
  decription: 'adding a note.',
  builder: {
    title: {
      decription: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      description: 'add body',
      demandOption: true,
      type: 'string',
    }
  },
  handler: function (argv) {
    addNote(argv.title, argv.body);
  }
});

yargs.command({
  command: 'remove',
  description: 'removing a note.',
  builder: {
    title: {
      description: 'note title to remove',
      demandOption: true,
      type: 'string',
    }
  },
  handler: function (argv) {
    removeNote(argv.title, () => {
      console.log(chalk.green('Note removed.'));
    }, () => {
      console.log(chalk.red('No note found.'));
    });
  }
});

yargs.command({
  command: 'listNotes',
  description: 'list all notes',
  builder: {

  },
  handler() {
    getNotes(chalk);
  },
});

yargs.command({
  command: 'read',
  description: 'read note by title',
  builder: {
    title: {
      description: 'note title',
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv) {
    readNote(chalk, argv.title);
  }
});

console.log(yargs.argv);

