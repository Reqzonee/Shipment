const express = require('express');
const { ViewClassrooms, ViewTasks } = require('../controllers/studentController');
const router = express.Router();

router.get('/:studentId/classrooms', ViewClassrooms);
router.get('/:studentId/classrooms/:classroomId/tasks', ViewTasks);


module.exports = router;
