const http = require('http');
const path = require('path');
const fs = require('fs').promises;

const app = http.createServer(async (req, res) => {
  if (req.url === '/students') {
    const filePath = path.resolve(__dirname, 'database.csv');

    try {
      await fs.access(filePath);

      res.write('This is the list of our students');

      await countStudentsAsync(filePath, res);

    } catch (error) {
      res.write('Database not found');
    }
  } else if (req.url === '/') {
    res.write('Hello Holberton School!');
  }

  res.end();
});

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});

async function countStudentsAsync(path, res) {
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

    res.write(`\nNumber of students: ${totalStudents}`);
    res.write(`\nNumber of students in CS: ${csStudents}. List: ${listOfCsStudents.join(', ')}`);
    res.write(`\nNumber of students in SWE: ${sweStudents}. List: ${listOfSweStudents.join(', ')}`);
    res.end();

  } catch (err) {
    console.error('Cannot load the database', err);
    res.write('Error reading the database');
    res.end();
  }
}

module.exports = app;
