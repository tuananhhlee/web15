const express = require('express');
const ImageRouter = express.Router();

const ImageModel = require('../models/imageModel');

// "/api/images" => get all
ImageRouter.get("/", async (req, res) => {
	console.log("Get all image");
	try {
		const images = await ImageModel.find({},"name avatar")
		.populate("user");
		res.json({ success: 1, images }); 
	} catch (error) {
		res.status(500).json({ success: 0, error: err })
	}
    // ImageModel.find({})
    //     .populate("user","name avatar")
    //     .exec((err, images) => {
    //         if(err) res.status(500).json({ success: 0, error: err })
    //         else res.json({ success: 1, images }); 
	// });
});

// get user by id
ImageRouter.get("/:id", (req, res) => {
	let imageId = req.params.id;
	ImageModel.findById(imageId, (err, imageFound) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else if(!imageFound) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, user: imageFound });
	});
});

// Create user
ImageRouter.post("/", (req, res) => {
	console.log(req.body)
	const { user, url, caption, title } = req.body;
	ImageModel.create({ user, url, caption, title }, (err, imageCreated) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else res.status(201).json({ success: 1, user: imageCreated });
	});
});

// Edit user
ImageRouter.put("/:id", (req, res) => {
	const imageId = req.params.id;
	const { url, caption, title } = req.body;

	// ImageModel.findById(imageId, (err, imageFound) => {
	// 	if(err) res.status(500).json({ success: 0, message: err })
	// 	else if(!imageFound) res.status(404).json({ success: 0, message: "Not found!" })
	// 	else {
	// 		for(key in { url, caption, title }) {
	// 			if(imageFound[key] && req.body[key]) imageFound[key] = req.body[key];
	// 		}

	// 		imageFound.save((err, imageUpdated) => {
	// 			if(err) res.status(500).json({ success: 0, message: err })
	// 			else res.json({ success: 1, image: imageUpdated });
	// 		});
	// 	};
	// });


	try {
		const imageFound = await ImageModel.findById(imageId);
		if(!imageFound){
			return res.status(404).json({ success: 0, message: "Not found!" });
		} else {
			for(key in { url, caption, title }) {
				if(imageFound[key] && req.body[key]) imageFound[key] = req.body[key];
			}
			let imageUpdated = await imageFound.save();
			res.json({ success: 1, image: imageUpdated });
		}
	} catch (error) {
		res.status(500).json({ success: 0, message: err })
	}

});

// Delete user => BTVN
ImageRouter.delete("/:id", (req, res) => {
	const imageId = req.params.id;
	ImageModel.remove({ _id: imageId }, (err) => {
		if(err) res.status(500).json({ success: 0, message: err})
		else res.json({ success: 1 });
	});
});

module.exports = ImageRouter;