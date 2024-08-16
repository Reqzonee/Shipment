const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		accountType: {
			type: String,
			enum: ["Teacher", "Student"],
			required: true,
		},
		token: {
			type: String,
		},
        classroom: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Classroom",
			},
		],


	},
	{ timestamps: true }
);

module.exports = mongoose.models.user || mongoose.model("user", userSchema);