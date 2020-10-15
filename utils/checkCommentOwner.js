const Comment = require('../models/comment');

const checkCommentOwner = async (req, res, next) => {
	if (req.isAuthenticated()) {	// check if the user is logged in 
		// if logged in, check if they own the comment
		const comment = await Comment.findById(req.params.commentId).exec();
		// if owner, then render the form to edit 
		if (comment.user.id.equals(req.user._id)) {
			next();
		} else {	// if not the owner, redirect to show page
			res.redirect("back");	// back is given to us by express
		}
	} else {	// if not logged in, redirect to /login
		res.redirect("/login");
	}
}

module.exports = checkCommentOwner;