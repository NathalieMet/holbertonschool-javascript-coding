#!/usr/bin/node
const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

if (!url || !filePath) {
  console.error('Usage: node script.js <file-path>');
  process.exit(1);
}

request(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }

  if (response.statusCode !== 200) {
    console.error('Failed to retrieve data. Status code:', response.statusCode);
    return;
  }

  try {
    fs.writeFile(filePath, body, 'utf-8', (err) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError.message);
  }
});
