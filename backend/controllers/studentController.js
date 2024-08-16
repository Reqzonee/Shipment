const user = require('../models/user'); 
const Classroom = require('../models/Classroom'); 
const ViewClassrooms = async (req, res) => {
    try {
        const { studentId } = req.params;

        const student = await user.findById(studentId).populate('classroom', 'Name');

        const classrooms = student.classroom.map(classroom => ({
            classroomId: classroom._id,
            classroomName: classroom.Name
        }));

        res.status(200).json(classrooms);

    } catch (error) {
        console.error('Error fetching classrooms:', error.message);
        res.status(500).json({ error: 'Server error during fetching classrooms' });
    }
};


const ViewTasks = async (req, res) => {
    try {
        const { studentId, classroomId } = req.params;

        const classroom = await Classroom.findById(classroomId);

        const tasks = classroom.Task.map(task => ({
            taskId: task._id,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate.toISOString().split('T')[0] 
        }));

        res.status(200).json(tasks);

    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ error: 'Server error during fetching tasks' });
    }
};

module.exports = {ViewClassrooms,ViewTasks};