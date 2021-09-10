const yargs = require("yargs");

yargs.command({
    command: 'add',
    describe: 'add a note',
    handler: function () {
        console.log('adding a note.');
    }
})

console.log(yargs.argv)