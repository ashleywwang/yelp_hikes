const express = require('express');
const router = express.Router();
const Trail = require('../models/trail');
const Comment = require('../models/comment');
const isLoggedIn = require('../utils/isLoggedIn');
const checkTrailOwner = require('../utils/checkTrailOwner');

// Index
router.get("/", async (req, res) => {
	console.log(req.user);
	try {
		const foundTrails = await Trail.find().exec();
		res.render("trails", {trails: foundTrails});
	} catch (err) {
		console.log(err);
		res.send("you broke it... /index");
	}
});

// Create
router.post("/", isLoggedIn, async (req, res) => {
	// create new Trail constant
	const newTrail = {
		name: req.body.name,
		description: req.body.description,
		city: req.body.city,
		state: req.body.state,
		zip_code: req.body.zip_code,
		difficulty: req.body.difficulty_radios,
		length: req.body.length,
		route_type: req.body.route_type, 
		activities: req.body.activities,
		image_link: req.body.image_link,
		owner: {
			id: req.user._id,
			username: req.user.username
		}
	}
	try {
		// call Trail model
		const trail = await Trail.create(newTrail);
		console.log(trail);
		res.redirect("/trails/" + trail._id);
	} catch (err) {
		console.log(err);
		res.send("You broke it... /trails POST")
		// res.redirect("/trails");
	}
});

// New
router.get("/new", isLoggedIn, (req, res) => {
	res.render("trails_new");
});

// Search
router.get("/search/", async (req, res) => {
	try {
		const trails = await Trail.find({
			$text: {
				$search: req.query.term
			}
		});
		res.render("trails", {trails});
	} catch (err) {
		console.log(err);
		res.send("Broken search");
	}
});

// Show
router.get("/:id", async (req, res) => {
	try {
		const trail = await Trail.findById(req.params.id).exec();
		const comments = await Comment.find({trailId: req.params.id});
		res.render("trails_show", {trail, comments});
	} catch (err) {
		console.log(err);
		res.send("You broke it... /trails/:id");
	}
});

// Edit
router.get("/:id/edit", checkTrailOwner, async (req, res) => {
		const trail = await Trail.findById(req.params.id).exec();
		res.render("trails_edit", {trail});
});

// Update
router.put("/:id", checkTrailOwner, async (req, res) => {
	const trail = {
		name: req.body.name,
		description: req.body.description,
		city: req.body.city,
		state: req.body.state,
		zip_code: req.body.zip_code,
		difficulty: req.body.difficulty_radios,
		length: req.body.length,
		route_type: req.body.route_type, 
		activities: req.body.activities,
		image_link: req.body.image_link
	}
	try {
		const updatedTrail = await Trail.findByIdAndUpdate(req.params.id, trail, {new: true}).exec();
		res.redirect(`/trails/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send("Broken again... /trails/id PUT");
	}
});

// Delete
router.delete("/:id", checkTrailOwner, async (req, res) => {
	try {
		const deletedTrail = await Trail.findByIdAndDelete(req.params.id).exec();
		console.log("Deleted:", deletedTrail);
		res.redirect("/trails");
	} catch (err) {
		console.log(err);
		res.send("Broken... /trails/id DELETE");
	}
});

module.exports = router;