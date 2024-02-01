const fs = require('fs').promises;

function countStudentsAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8')
      .then((data) => {
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

        const result = {
          sentence1: `Number of students: ${totalStudents}`,
          sentence2: `Number of students in CS: ${csStudents}. List: ${listOfCsStudents.join(', ')}`,
          sentence3: `Number of students in SWE: ${sweStudents}. List: ${listOfSweStudents.join(', ')}`,
        };
        console.log(result.sentence1);
        console.log(result.sentence2);
        console.log(result.sentence3);

        resolve(result); // Resolve with the result object
      })
      .catch((err) => {
        console.error('Cannot load the database', err);
        reject(new Error('Cannot load the database'));
      });
  });
}

module.exports = countStudentsAsync;
