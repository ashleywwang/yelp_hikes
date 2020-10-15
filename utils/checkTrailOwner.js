const Trail = require('../models/trail');

const checkTrailOwner = async (req, res, next) => {
	if (req.isAuthenticated()) {	// check if the user is logged in 
		// if logged in, check if they own the trail 
		const trail = await Trail.findById(req.params.id).exec();
		// if owner, then render the form to edit 
		if (trail.owner.id.equals(req.user._id)) {
			next();
		} else {	// if not the owner, redirect to show page
			res.redirect("back");	// back is given to us by express
		}
	} else {	// if not logged in, redirect to /login
		res.redirect("/login");
	}
}

module.exports = checkTrailOwner;