const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();

program
    .requiredOption('-i, --input <file>', 'input JSON file')
    .option('-o, --output <file>', 'output file')
    .option('-d, --display', 'display result in console')
    .parse(process.argv);

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

// ������� JSON �����
let jsonData;
try {
    jsonData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
} catch (err) {
    console.error('Error reading or parsing input file');
    process.exit(1);
}

let result = "";
for (let i = 0; i < jsonData[0].exchangedate.length; i++) {
    result += `${ jsonData[0].exchangedate[i] }: ${ jsonData[0].rate[i] } \n`;
}

// ���� ������ �������� --display, �������� ��������� � �������
if (options.display) {
    console.log(result);
}

// ���� ������ �������� --output, �������� ��������� � ����
if (options.output) {
    const outputPath = path.resolve(options.output);
    fs.writeFileSync(outputPath, result, 'utf8');
    console.log(`Result saved to ${outputPath}`);
}

// ���� �� ������ � --output, � --display, �������� ����� �� ������
if (!options.output && !options.display) {
    process.exit(0);
}
