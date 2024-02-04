const readDatabase = require('../utils');

class StudentsController {
	static getAllStudents(request, response) {
		try {
			const result = readDatabase(database);
			response.status(200).send('This is the list of our students\n');
			response.write(`Number of students in CS: ${result.listOfCsStudents.length}. List: ${result.listOfCsStudents.join(', ')}\n`);
			response.write(`Number of students in SWE: ${result.listOfSweStudents.length}. List: ${result.listOfSweStudents.join(', ')}\n`);
			response.end();
		  } catch (error) {
			response.status(500).send('Cannot load the database');
		  }
		}

		static getAllStudentsByMajor(request, response) {
			try {
				const major = request.query.major;

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
