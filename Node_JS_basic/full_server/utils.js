import fs from 'fs';

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const lines = data.split('\n').filter((line) => line.trim() !== '');

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
          const [firstName, , , field] = fields;

          if (field.trim() === 'CS') {
            listOfCsStudents.push(firstName);
          }

          if (field.trim() === 'SWE') {
            listOfSweStudents.push(firstName);
          }
        }
      }

      const result = {
        CS: listOfCsStudents,
        SWE: listOfSweStudents,
      };

      resolve(result);
    });
  });
}

module.exports = readDatabase;
