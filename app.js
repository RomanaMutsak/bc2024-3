const { program } = require('commander');
const fs = require('fs');

program
    .requiredOption('-i, --input <path>', 'input file')
    .option('-o, --output <path>', 'output file')
    .option('-d, --display', 'display result in console');

program.parse(process.argv);

const options = program.opts();

// ��������, �� ������ ������� ����
if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

// ��������, �� ���� ������� ����
const inputPath = path.resolve(options.input);
if (!fs.existsSync(inputPath)) {
    console.error('Cannot find input file');
    process.exit(1);
}
