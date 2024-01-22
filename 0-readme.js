#!/usr/bin/node
const fs = require('fs');

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node script.js <file-path>');
  process.exit(1);
}

fs.readFile(filePath, 'utf-8', (err, content) => {
  if (err) {
    console.error(err);
  } else {
    console.log(content);
  }
});
