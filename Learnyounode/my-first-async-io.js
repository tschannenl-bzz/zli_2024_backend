const fs = require("fs")

const argument = process.argv;
const file = fs.readFile(argument);
const stringFile = file.toString();
const argList = stringFile.split('\n');
console.log(argList.length);