#!/usr/bin/node

const request = require('request');

const url = process.argv[2];

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
    const movies = JSON.parse(body).results;
    const characterId = '/18/';
    let count = 0;

    for (const movie of movies) {
      for (const character of movie.characters) {
        if (character.includes(characterId)) {
          count += 1;
          break;
        }
      }
    }
    console.log(count);
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError.message);
  }
});

// try {
// const movies = JSON.parse(body).results;
//  const characterId = '18';
// let count = 0;

// const moviesWithWedge = movies.filter((movie) => movie.characters.includes(`https://swapi-api.hbtn.io/api/people/${characterId}/`));
// console.log(moviesWithWedge.length);
// } catch (parseError) {
// console.error('Error parsing JSON:', parseError.message);
