const Classroom = require("../models/Classroom");
const user = require("../models/user");

const createclassroom = async (req, res)=>{
    try{
        console.log("inside classroom");
        // console.log("req is ", req);
        const { teacherId } = req.params;
        console.log("req.params: ", req.params);
        console.log("user id is ", teacherId);

        let {classroomname}=req.body;

        const newClassroom = await Classroom.create({
            Name:classroomname,
            creater:teacherId
        })

        const updateduser = await user.findByIdAndUpdate(
            {_id:teacherId},
            {
                $push:{
                    classroom:newClassroom._id
                },
            }
        )


        res.status(201).json({mesasge:"classroom clreated",newClassroom});

    } catch(error){
        console.error('classroom creation error:', error.message);
        res.status(500).json({ error: 'Server error during classroom creation' });  
    }
}

const AddStudent = async (req, res)=>{
    try{
        const { teacherId,classroomId } = req.params;
        const {studentId} = req.body;

        const classroom = await Classroom.findByIdAndUpdate(
            {_id:classroomId},
            {
                $push:{
                    studentsEnrolled:studentId
                },
            }
        );

        const updateduser = await user.findByIdAndUpdate(
            {_id:studentId},
            {
                $push:{
                    classroom:classroomId
                },
            }
        )

        // console.log("classroom is ", classroom);

        res.status(201).json({mesasge:"Student added successfully"});

    } catch(error){
        console.error('student add error:', error.message);
        res.status(500).json({ error: 'Server error during adding student to classroom' });  
    }
}


const DeleteStudent = async (req, res)=>{
    try{
        const { teacherId,classroomId,studentId } = req.params;

        const classroom = await Classroom.findByIdAndUpdate(
            {_id:classroomId},
            {
                $pull:{
                    studentsEnrolled:studentId
                },
            }
        );

        const updateduser = await user.findByIdAndUpdate(
            {_id:studentId},
            {
                $pull:{
                    classroom:classroomId
                },
            }
        )


        console.log("classroom is ", classroom);

        res.status(201).json({mesasge:"Student removed successfully"});

    } catch(error){
        console.error('student add error:', error.message);
        res.status(500).json({ error: 'Server error during deleting student to classroom' });  
    }
}

const Assign_Tasks = async (req, res)=>{
    try{

        const { teacherId,classroomId } = req.params;

        const {title, description, dueDate} = req.body;

        const newTask = {
            title,
            description,
            dueDate,
            status: "Assigned"
        };


        const classroom = await Classroom.findByIdAndUpdate(
            {_id:classroomId},
            {
                $push:{
                    Task:newTask
                },
                
            },
            {new:true}
        );

        res.status(201).json({
            message: "Task added successfully",
            task: newTask
        });



    } catch(error){
        console.error('Task addition error:', error.message);
        res.status(500).json({ error: 'Server error during deleting adding task' });  
    }
}

const View_Classrooms = async (req, res) => {
    try {
        const { teacherId } = req.params;

        const classrooms = await Classroom.find({ creater: teacherId });

        res.status(200).json({
            classrooms
        });

    } catch (error) {
        console.error('Error fetching classrooms:', error.message);
        res.status(500).json({ error: 'Server error during fetching classrooms' });
    }
};

const Edit_Classroom = async (req, res) => {
    try {
        const { classroomId } = req.params;
        const { classroomName } = req.body;

        const updatedClassroom = await Classroom.findByIdAndUpdate(
            classroomId,
            { Name: classroomName },
            { new: true } 
        );

        if (!updatedClassroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        res.status(200).json({
            message: "Classroom updated successfully",
            classroom: updatedClassroom
        });

    } catch (error) {
        console.error('Error updating classroom:', error.message);
        res.status(500).json({ error: 'Server error during updating classroom' });
    }
};


const Delete_Classroom = async (req, res) => {
    try {
        const { classroomId } = req.params;

        const deletedClassroom = await Classroom.findByIdAndDelete(classroomId);

        if (!deletedClassroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        res.status(200).json({
            message: "Classroom deleted successfully"
        });

    } catch (error) {
        console.error('Error deleting classroom:', error.message);
        res.status(500).json({ error: 'Server error during deleting classroom' });
    }
};

const ViewTaskSubmission = async (req, res) => {
    try {
        const { classroomId, taskId } = req.params;

        const classroom = await Classroom.findById(classroomId).populate('studentsEnrolled');
        const task = classroom.Task.id(taskId);

        const submissions = classroom.studentsEnrolled.map(student => {
            return {
                studentId: student._id,
                studentName: `${student.firstName} ${student.lastName}`,
                status: task.submissions && task.submissions.includes(student._id) ? 'Assigned' : 'Submitted'
            };
        });

        res.status(200).json(submissions);



    } catch (error) {
        console.error('Error in viewing Task:', error.message);
        res.status(500).json({ error: 'Server error during viewing task' });
    }
};





module.exports = {createclassroom,AddStudent, DeleteStudent,Assign_Tasks, View_Classrooms, Edit_Classroom, Delete_Classroom, ViewTaskSubmission};