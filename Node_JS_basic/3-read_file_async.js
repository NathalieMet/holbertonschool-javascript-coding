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

        console.log(`Number of students: ${totalStudents}`);
        console.log(`Number of students in CS: ${csStudents}. List: ${listOfCsStudents.join(', ')}`);
        console.log(`Number of students in SWE: ${sweStudents}. List: ${listOfSweStudents.join(', ')}`);
        resolve(); // Resolve without passing any result as it is not defined in your function
      })
      .catch((err) => {
        console.error('Cannot load the database', err);
        reject(new Error('Cannot load the database'));
      });
  });
}

module.exports = countStudentsAsync;
