const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	text: String,
	trailId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Trail"
	}
	
});

module.exports = mongoose.model("comment", commentSchema);