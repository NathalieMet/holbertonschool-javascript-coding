#!/usr/bin/node

const url = process.argv[2];
const request = require('request');

request(url, (error, response) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('code:', response.statusCode); // Print the response status code if a response was received
});
