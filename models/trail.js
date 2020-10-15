const mongoose = require('mongoose');

const trailSchema = new mongoose.Schema({
	name: String,
	description: String,
	city: String,
	state: String,
	zip_code: String,
	difficulty: String,
	length: String,
	route_type: String, 
	activities: [String],
	image_link: String,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

trailSchema.index({
	'$**': 'text'
});

const Trail = mongoose.model("trail", trailSchema);

module.exports = Trail;