const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');

const QuestionModel = require('./questionModel');


mongoose.connect("mongodb://localhost/quyetde",(err) =>{
	if(err) console.log(err)
	else console.log("DB connect success")
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/answer.html');
});

app.get('/ask', (req, res) => {
	res.sendFile(__dirname + '/public/ask.html');
});

app.get('/answer', (req, res) => {
	res.sendFile(__dirname + '/public/answer.html');
});

// app.get('/result', (req, res) => {
//     res.sendFile(__dirname + '/public/result.html')
// });

app.post('/createquestion', (req, res) => {
	// let questionList = JSON.parse(fs.readFileSync('./questions.json'));

	// const newQuestion = {
	// 	id: questionList.length,
	// 	questionContent: req.body.questionContent,
	// 	yes: 0,
	// 	no: 0
	// };
	// const newQuestion = new QuestionModel({
	// 	questionContent: req.body.questionContent,
	 	
	// });
	// newQuestion.save();
	// res.redirect('/answer');

	QuestionModel.create(
		{questionContent: req.body.questionContent},
		(err, questionCreated) =>{
			if(err) console.log(err)
			else res.redirect('/question/' + questionCreated._id);
		}
	)

	// questionList.push(newQuestion);

	// fs.writeFileSync('./questions.json', JSON.stringify(questionList));

	// res.redirect('/answer');
});

app.get('/randomquestion', (req, res) => {

	// let questionList = JSON.parse(fs.readFileSync('./questions.json'));

	// if(questionList.length > 0) {
	// 	let randomIndex = Math.floor(Math.random()*questionList.length);
	// 	let questionRandom = questionList[randomIndex];
	// 	question = questionRandom;
	// 	res.send(questionRandom);
	// }

	QuestionModel.count({}, (err,count) =>{

	let ramdomNum = Math.floor(Math.random()*count);
		QuestionModel.findOne({},null,{ skip: ramdomNum },(err, questionFound) =>{
			if(err) console.log(err)
			else res.send(questionFound);
		})
	})
	
}); 

// app.get('/voteQuest', (req, res) => {
//     if (questionList.length > 0) {
//         let voteQuest = questionRandom;
//         res.send(voteQuest);
//     }
// });
	
app.post('/answer', (req, res) => {
	const { questionid, answer } = req.body;
	// QuestionModel.findByIdAndUpdate(
	// 	questionid,
	// 	{ $inc: { answer:1 } },
	// 	(err,questionUpdated)=>{
	// 		if(err) console.log(err)
	// 		else res.send({ success: 1});
	// 	}
	// )
	// const questionid = req.body.questionid;
	// const answer = req.body.answer;

	// let questionList = JSON.parse(fs.readFileSync('./questions.json'));
	// console.log(questionList);
	// questionList[questionid][answer] += 1;
	// fs.writeFileSync('./questions.json', JSON.stringify(questionList));
	// res.send({ success: 1 });

	QuestionModel.findById(questionid,(err, questionFound)=>{
		if(err) console.log(err)
		else if(!questionFound) console.log("Not found")
		else {
			questionFound[answer] +=1;
			questionFound.save((err, questionUpdated) =>{
				if(err) console.log(err);
				else res.send({ success:1 });
			})
		}
	})
});
app.get('/question/:questionId',(req,res)=>{
	res.sendFile(__dirname +"/public/detail.html");
})

app.get('/questiondetail/:questionId',(req,res)=>{
	let questionId = req.params.questionId;
	QuestionModel.findById(questionId,(err,questionFound)=>{
		if(err) console.log(err)
		else if(!questionFound) console.log("Not found")
		else res.send({ success:1, question:questionFound});
	});
});

app.use(express.static('public'));

const port = 9000
app.listen(port, (err) => {
	if(err) console.log(err)
	else console.log(`Server is listening at port ${port}`);
});