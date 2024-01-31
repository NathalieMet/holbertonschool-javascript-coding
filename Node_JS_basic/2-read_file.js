const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
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

    console.log(`Number of students: ${totalStudents}`);
    console.log(`Number of students in CS: ${csStudents}. List: ${listOfCsStudents.join(', ')}`);
    console.log(`Number of students in SWE: ${sweStudents}. List: ${listOfSweStudents.join(', ')}`);
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
