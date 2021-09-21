const yargs = require("yargs");
const { addNote } = require('./notes');

yargs.command({
    command: 'add',
    describe: 'add a note',
    handler (argv) {
        addNote(argv.title, argv.body);
    },
    builder: {
        command: 'add',
        describe: 'adding a note',
        title: 'string',
        body: 'string',
    },
})
