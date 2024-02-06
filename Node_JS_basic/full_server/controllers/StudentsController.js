import readDatabase from '../utils';

const database = (process.argv[2] || './database.csv');

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(database)
      .then((result) => {
        console.log(result);
        const sentence = 'This is the list of our students\n';
        response.status(200).send(`${sentence}Number of students in CS: ${result.CS.length}. List: ${result.CS.join(', ')}\nNumber of students in SWE: ${result.SWE.length}. List: ${result.SWE.join(', ')}`);
      })
      .catch((error) => { response.status(500).send(error.message); });
  }

  static getAllStudentsByMajor(request, response) {
    try {
      const { major } = request.query;

      if (major === 'CS' || major === 'SWE') {
        const result = readDatabase(database);
        if (major === 'CS') {
          response.status(200).send(`List: ${result.listOfCsStudents.join(', ')}\n`);
        } else {
          response.status(200).send(`List: ${result.listOfSweStudents.join(', ')}\n`);
        }
      } else {
        response.status(500).send('Major parameter must be CS or SWE');
      }
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
