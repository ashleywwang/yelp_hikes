const express = require('express');
const router = express.Router({mergeParams: true});
const Comment = require('../models/comment');
const Trail = require('../models/trail');
const isLoggedIn = require('../utils/isLoggedIn');
const checkCommentOwner = require('../utils/checkCommentOwner');

// New Comment - Show Form
router.get("/new", isLoggedIn, (req, res) => {
	res.render("comments_new", {trailId: req.params.id});
})

// Create Comment - Actually Update DB
router.post("/", isLoggedIn, async (req, res) => {
	try {
		// Create the comment
		const newComment = await Comment.create({
			user: {
				id: req.user._id,
				username: req.user.username
			},
			text: req.body.text,
			trailId: req.body.trailId
		})
		console.log(newComment);
		// redirect to the show page for the trail the comment goes with 
		res.redirect(`/trails/${req.body.trailId}`);
	} catch (err) {
		console.log(err);
		res.send("Broken again... POST comments");
	}	
})

// Edit Comment - Show the edit form
router.get("/:commentId/edit", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.commentId).exec();
		console.log("comment:", comment);
		res.render("comments_edit", {trailId: req.params.id, comment});
	} catch (err) {
		console.log(err);
		res.send("Broke Comment Edit GET");
	}
})

// Update Comment - Actually update in DB
router.put("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true});
		console.log(comment);
		res.redirect(`/trails/${req.params.id}`)
	} catch (err) {
		console.log(err);
		res.send("Broke comment PUT");
	}
})


// Delete Comment
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		console.log(comment);
		res.redirect(`/trails/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send("Brokken comment DELETE");
	}
})

module.exports = router;