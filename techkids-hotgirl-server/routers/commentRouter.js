const express = require('express');
const CommentRouter = express.Router();

const CommentModel = require('../models/commentModel');

// "/api/images" => get all
CommentRouter.get("/", async (req, res) => {
	console.log("Get all image");
	try {
		const comments = await CommentModel.find({},"name avatar")
		.populate("user");
		res.json({ success: 1, comments }); 
	} catch (error) {
		res.status(500).json({ success: 0, error: err })
	}
    
});

// get user by id
CommentRouter.get("/:id", (req, res) => {
	let commentId = req.params.id;
	CommentModel.findById(commentId, (err, commentFound) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else if(!commentFound) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, user: commentFound });
	});
});

// Create user
CommentRouter.post("/", (req, res) => {
	console.log(req.body)
	const { user, url, caption, title } = req.body;
	CommentModel.create({ user, url, caption, title }, (err, commentCreated) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else res.status(201).json({ success: 1, user: commentCreated });
	});
});

// Edit user
CommentRouter.put("/:id", (req, res) => {
	const commentId = req.params.id;
	const { url, content } = req.body;


	try {
		const commentFound = await CommentModel.findById(commentId);
		if(!commentFound){
			return res.status(404).json({ success: 0, message: "Not found!" });
		} else {
			for(key in { url, content }) {
				if(commentFound[key] && req.body[key]) commentFound[key] = req.body[key];
			}
			let commentUpdated = await commentFound.save();
			res.json({ success: 1, image: commentUpdated });
		}
	} catch (error) {
		res.status(500).json({ success: 0, message: err })
	}

});


CommentRouter.delete("/:id", (req, res) => {
	const commentId = req.params.id;
	CommentModel.remove({ _id: commentId }, (err) => {
		if(err) res.status(500).json({ success: 0, message: err})
		else res.json({ success: 1 });
	});
});

module.exports = CommentRouter;