const http = require('http');
const path = require('path');
const fs = require('fs').promises;

const app = http.createServer(async (req, res) => {
  if (req.url === '/students') {
    const filePath = path.resolve(__dirname, 'database.csv');

    try {
      await fs.access(filePath); // Use fs.promises.access instead of fs.exists

      res.write('This is the list of our students');

      try {
        const data = await fs.readFile(filePath, 'utf8');
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

        res.write(`\nNumber of students: ${totalStudents}`);
        res.write(`\nNumber of students in CS: ${csStudents}. List: ${listOfCsStudents.join(', ')}`);
        res.write(`\nNumber of students in SWE: ${sweStudents}. List: ${listOfSweStudents.join(', ')}`);
      } catch (error) {
        console.error('Cannot load the database', error);
        res.write('Error reading the database');
      }
    } catch (error) {
      res.write('Database not found');
    }
  } else if (req.url === '/') {
    res.write('Hello Holberton School!');
  }

  res.end(); // Move this outside the if-else block
});

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running and listening on port ${PORT}`);
});

module.exports = app;
