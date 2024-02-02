const express = require('express');

const app = express();

const PORT = 1245;

const database = process.argv[2];

const countStudentsAsync = require('./3-read_file_async');

// Define route for the endpoint '/'
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const result = await countStudentsAsync(database);
    res.write('This is the list of our students\n');
    res.write(`${result.sentence1}\n`);
    res.write(`${result.sentence2}\n`);
    res.write(`${result.sentence3}`);
    res.end();
  } catch (error) {
    res.end('Database not found');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});

// Export the app variable
module.exports = app;
