#!/usr/bin/node

const url = process.argv[2];
const request = require('request');

request.get(url, (error, response) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('code:', response.statusCode);
});
