const Trail = require('../models/trail');
const Comment = require('../models/comment');

const trail_seeds = [
	{
		name: "Lands End Trail",
		description: "Lands End offers spectacular views of the Golden Gate, the Marin Headlands and the waters of the Pacific. Traversing the coastal bluffs above the ocean between Point Lobos and the Sea Cliff neighborhood, the Coastal Trail provides hikers, runners, bicyclists and beachcombers easy urban access to the Golden Gate’s rugged southern edge.",
		city: "San Francisco",
		state: "CA",
		zip_code: "94121",
		difficulty: "Beginner",
		length: "3.8",
		route_type: "Loop", 
		activities: ["Hiking", "Biking"],
		image_link: "https://www.outdoorproject.com/sites/default/files/styles/hero_image_desktop_2x/public/features/img_6032.jpg?itok=pPsD2fCT"
	},
	{
		name: "Mount Diablo State Park",
		description: "Mount Diablo State Park is named for the 3,849-foot peak that offers breathtaking views of the surrounding hills and valleys. There are hiking trails appropriate for every level of ability, but the truly spectacular views are only available to those willing to take on a challenge.",
		city: "Clayton",
		state: "CA",
		zip_code: "94517",
		difficulty: "Intermediate",
		length: "2.9",
		route_type: "Point-to-Point", 
		activities: ["Hiking", "Park"],
		image_link: "https://upload.wikimedia.org/wikipedia/commons/6/62/View_of_Mount_Diablo_and_CA_Highway_24_from_Lafayette_Heights.jpg"
	},
	{
		name: "Eaton Canyon Trail",
		description: "Eaton Canyon Trail is a 3.5 mile heavily trafficked out and back trail located near Pasadena, California that features a waterfall and is good for all skill levels. The trail is primarily used for hiking and is accessible year-round. Dogs are also able to use this trail but must be kept on leash.",
		city: "Pasadena",
		state: "CA",
		zip_code: "91001",
		difficulty: "Advanced",
		length: "3.4",
		route_type: "Out-and-Back", 
		activities: ["Hiking"],
		image_link: "https://www.pasadenastarnews.com/wp-content/uploads/2020/05/0626_nws_psn_l_crimescene01-1.jpg"
	}
]

const seed = async () => {
	// Delete all current trails and comments
	await Trail.deleteMany();
	console.log("Deleted all the trails.");
	
	await Comment.deleteMany();
	console.log("Deleted all the comments.");
	
	// Create three new trails
	// for (const trail_seed of trail_seeds) {
	// 	let trail = await Trail.create(trail_seed);
	// 	console.log("Created a new trail:", trail.name);
	// 	// Create a new comment for each trail
	// 	await Comment.create({
	// 		text: "I loved this trail!",
	// 		user: "scooby_doo",
	// 		trailId: trail._id
	// 	})
	// 	console.log("Created a new comment.")
	// }
}

module.exports = seed;