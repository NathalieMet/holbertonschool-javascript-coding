const http = require('http');
const path = require('path');
const fs = require('fs').promises;

const PORT = 1245;

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    // Handle root path
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    // Handle /students path
    const filePath = path.resolve(__dirname, 'database.csv');

    try {
      await fs.access(filePath);
      const data = await countStudentsAsync(filePath);

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`This is the list of our students\n${data}`);
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Database not found');
    }
  } else {
    // Handle other paths
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});

async function countStudentsAsync(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    let totalStudents = 0;
    let csStudents = 0;
    let sweStudents = 0;
    const listOfCsStudents = [];
    const listOfSweStudents = [];

    let isFirstLine = true;

    for (const line of lines) {
      if (isFirstLine) {
        isFirstLine = false;
        // eslint-disable-next-line no-continue
        continue;
      }

      const fields = line.split(',');

      if (fields.length === 4) {
        totalStudents += 1;
        const [firstName, , , field] = fields;

        if (field.trim() === 'CS') {
          csStudents += 1;
          listOfCsStudents.push(firstName);
        }

        if (field.trim() === 'SWE') {
          sweStudents += 1;
          listOfSweStudents.push(firstName);
        }
      }
    }

    const result = `\nNumber of students: ${totalStudents}\nNumber of students in CS: ${csStudents}. List: ${listOfCsStudents.join(', ')}\nNumber of students in SWE: ${sweStudents}. List: ${listOfSweStudents.join(', ')}`;
    return result;
  } catch (err) {
    console.error('Cannot load the database', err);
    throw new Error('Cannot load the database');
  }
}
