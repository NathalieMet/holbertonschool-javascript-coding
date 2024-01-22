#!/usr/bin/node
const fs = require('fs');

const filePath = process.argv[2];
const text = process.argv[3];

if (!filePath) {
  console.error('Usage: node script.js <file-path>');
  process.exit(1);
}

fs.writeFile(filePath, text, 'utf-8', (err) => {
  if (err) {
    console.error(err);
  }
});
