const fs = require("fs")

const argument = process.argv;
const file = fs.readFileSync(argument[2]);
const stringFile = file.toString();
const argList = stringFile.split('\n');
console.log(argList.length-1);