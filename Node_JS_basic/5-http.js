const http = require('http');
const fs = require('fs').promises;
const countStudentsAsync = require('./3-read_file_async');

const database = process.argv[2];

const app = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    fs.access(database)
      .then(() => {
        res.write('This is the list of our students\n');
        return countStudentsAsync(database);
      })
      .then((result) => {
        res.write(`${result.sentence1}\n`);
        res.write(`${result.sentence2}\n`);
        res.write(`${result.sentence3}`);
        res.end();
      })
      .catch(() => {
        res.end('Database not found');
      });
  } else {
    res.end('Not Found');
  }
});

const port = 1245;
module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
