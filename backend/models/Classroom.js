const mongoose = require("mongoose");


const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["Assigned", "Submitted"],
        default: "Assigned"
    }
}); 


const ClassroomSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    studentsEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	],
    creater: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
    Task: [
        TaskSchema
    ]
});

module.exports = mongoose.model("Classroom", ClassroomSchema)
