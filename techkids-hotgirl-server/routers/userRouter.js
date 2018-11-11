const express = require('express');
const UserRouter = express.Router();

const UserModel = require('../models/userModel');

// Middleware
UserRouter.use((req, res, next) => {
	console.log("User middleware");
	next();
});

// "/api/users" => get all
UserRouter.get("/", async(req, res) => {
	console.log("Get all user");
	try {
		const users = await UserModel.find({}, "name email avatar intro posts")
		.populate("posts");
		res.json({success: 1, users});
	} catch (error) {
		res.status(500).json({ success: 0, error: err });
	}
    // UserModel.find({}, "name email avatar intro posts")
	// .populate("posts")
	// .then(users =>res.json({ success: 1, users }))
	// .catch(err => res.status(500).json({ success: 0, error: err}));
    // .exec( (err, users) => {
	// 	if(err) res.status(500).json({ success: 0, error: err })
	// 	else res.json({ success: 1, users });
	// });
});

// get user by id
UserRouter.get("/:id", (req, res) => {
	let userId = req.params.id;
	UserModel.findById(userId, (err, userFound) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else if(!userFound) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, user: userFound });
	});
});

// Create user
UserRouter.post("/", async(req, res) => {
	console.log(req.body)
	const { name, email, password, avatar, intro } = req.body;
	UserModel.create({ name, email, password, avatar, intro }, (err, userCreated) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else res.status(201).json({ success: 1, user: userCreated });
	});
});

// Edit user
UserRouter.put("/:id", (req, res) => {

	// UserModel.findByIdAndUpdate(userId, { name, password, avatar, intro }, { new: true }, (err, userUpdated) => {
	// 	if(err) res.status(500).json({ success: 0, message: err })
	// 	else res.json({ success: 1, user: userUpdated });
	// });
	const userId = req.params.id;
	const { name, password, avatar, intro, posts } = req.body;

	// UserModel.findById(userId, (err, userFound) => {
	// 	if(err) res.status(500).json({ success: 0, message: err })
	// 	else if(!userFound) res.status(404).json({ success: 0, message: "Not found!" })
	// 	else {
	// 		for(key in { name, password, avatar, intro, posts }) {
	// 			if(userFound[key] && req.body[key]) userFound[key] = req.body[key];
	// 		}

	// 		userFound.save((err, userUpdated) => {
	// 			if(err) res.status(500).json({ success: 0, message: err })
	// 			else res.json({ success: 1, user: userUpdated });
	// 		});
	// 	};
	// });

	// UserModel.findById(userId)
	// 	.then(userFound => {
	// 		if(!userFound){
	// 			res.status(404).json({ success: 0, message: "Not found!" });
	// 		} else {
	// 			for(key in { name, password, avatar, intro, posts }) {
	// 				if(userFound[key] && req.body[key]) userFound[key] = req.body[key];
	// 		}
	// 		return userFound.save();
	// 		}
	// 	})
	// 	.then(userUpdated => res.json({ success: 1, user: userUpdated }))
	// 	.catch(err => res.status(500).json({ success: 0, message: err }))

		try {
			const userFound = await UserModel.findById(userId);
			if(!userFound){
				return res.status(404).json({ success: 0, message: "Not found!" });
			} else {
				for(key in { name, password, avatar, intro, posts }) {
					if(userFound[key] && req.body[key]) userFound[key] = req.body[key];
				}
				let userUpdated = await userFound.save();
				res.json({ success: 1, user: userUpdated })
			}
		} catch (error) {
			res.status(500).json({ success: 0, message: error })
		}

});

// Delete user => BTVN
UserRouter.delete("/:id", (req, res) => {
	const userId = req.params.id;
	UserModel.remove({ _id: userId }, (err) => {
		if(err) res.status(500).json({ success: 0, message: err})
		else res.json({ success: 1 });
	});
});

module.exports = UserRouter;