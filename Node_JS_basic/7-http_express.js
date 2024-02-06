const express = require('express');
const countStudentsAsync = require('./3-read_file_async');

const app = express();

const PORT = 1245;

const database = process.argv[2];


// Define route for the endpoint '/'
app.get('/', (req, res) => {
  res.type('text/plain').send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
    countStudentsAsync(database)
      .then((result) => {
      res.write('This is the list of our students\n');
      res.write(`${result.sentence1}\n`);
      res.write(`${result.sentence2}\n`);
      res.write(`${result.sentence3}`);
      res.end();
    })
    .catch ((error) => {
      res.type('text/plain').send('Database not found');
    });
});

// Start the server
app.listen(PORT)

// Export the app variable
module.exports = app;
