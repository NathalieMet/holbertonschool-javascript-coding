const readDatabase = require('../utils');

const database = (process.argv[2]);

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(database)
      .then((result) => {
        const sentence = 'This is the list of our students\n';
        const sentence2 = `${sentence}Number of students in CS: ${result.CS.length}. List: ${result.CS.join(', ')}\nNumber of students in SWE: ${result.SWE.length}. List: ${result.SWE.join(', ')}`;
        response.status(200).send(sentence2);
      })
      .catch((error) => { response.status(500).send(error.message); });
  }

  static getAllStudentsByMajor(request, response) {
    readDatabase(database)
      .then((result) => {
        const { major } = request.params;
          if ((major === 'CS') || (major === 'SWE')) {
            response.status(200).send(`List: ${result[major].join(', ')}`);
          } else {
          response.status(500).send('Major parameter must be CS or SWE');
        }
      })
      . catch((error) => { response.status(500).send(error.message); });
  }
}

module.exports = StudentsController;
