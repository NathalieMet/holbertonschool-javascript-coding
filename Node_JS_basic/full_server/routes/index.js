const express = require('express');
const AppController = require('../controllers/AppController');

import StudentsController from '../controllers/StudentsController';


const router = express.Router();

router.get('/', AppController.getHomepage);
router.get('/students', StudentsController.getAllStudents);
router.get('/students/:major', StudentsController.getAllStudentsByMajor);

module.exports = router;
