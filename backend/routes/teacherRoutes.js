const express = require("express");
const { createclassroom, AddStudent, DeleteStudent, Assign_Tasks, View_Classrooms, Edit_Classroom, Delete_Classroom, ViewTaskSubmission } = require("../controllers/techerController");
const router = express.Router()

router.post('/:teacherId/classrooms', createclassroom);
router.post('/:teacherId/classrooms/:classroomId/students', AddStudent);
router.delete('/:teacherId/classrooms/:classroomId/students/:studentId', DeleteStudent);
router.post('/:teacherId/classrooms/:classroomId/tasks', Assign_Tasks);
router.get('/:teacherId/classrooms', View_Classrooms);
router.put('/classrooms/:classroomId', Edit_Classroom);
router.delete('/classrooms/:classroomId', Delete_Classroom);
router.get('/classrooms/:classroomId/tasks/:taskId/submissions', ViewTaskSubmission);

module.exports = router;
