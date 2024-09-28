const { program } = require('commander');
const fs = require('fs');

program
    .requiredOption('-i, --input <path>', 'input file')
    .option('-o, --output <path>', 'output file')
    .option('-d, --display', 'display result in console');

program.parse(process.argv);

const options = program.opts();


