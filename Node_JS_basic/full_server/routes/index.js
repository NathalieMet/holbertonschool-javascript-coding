import StudentsController from '../controllers/StudentsController';

import AppController from '../controllers/AppController';

const express = require('express');

const router = express.Router();

router.get('/', AppController.getHomepage);
router.get('/students', StudentsController.getAllStudents);
router.get('/students/:major', StudentsController.getAllStudentsByMajor);

module.exports = router;
