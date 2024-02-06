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
    const { major } = request.params;
    readDatabase(database)
      .then((result) => {
        if (major === 'CS' || major === 'SWE') {
          if (major === 'CS') {
            response.status(200).send(`List: ${result.CS.join(', ')}`);
          } else {
            response.status(200).send(`List: ${result.SWE.join(', ')}`);
          }
        } else {
          response.status(500).send('Major parameter must be CS or SWE');
        }
      })
      . catch((error) => { response.status(500).send(error.message); });
  }
}

module.exports = StudentsController;
