const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/techkids-hotgirl")

const userRouter = require('./routers/userRouter');
const imageRouter = require('./routers/imageRouter');
const CommentRouter = require("./routers/commentRouter");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
	res.send("Api router");
});

app.use("/api/users", userRouter);
app.use("/api/images", imageRouter);
app.use("/api/comments",CommentRouter);

// Middleware
app.use((req, res, next) => {
	console.log("404");
	res.send("404");
});

const port = 6969;
app.listen(port, (err) => {
	if(err) console.log(err)
	else console.log("Listen at port " + port);
});