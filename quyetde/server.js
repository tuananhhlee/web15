const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
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

app.get('/result', (req, res) => {
    res.sendFile(__dirname + '/public/result.html')
});

app.post('/createquestion', (req, res) => {
	let questionList = JSON.parse(fs.readFileSync('./questions.json'));

	const newQuestion = {
		id: questionList.length,
		questionContent: req.body.questionContent,
		yes: 0,
		no: 0
	};

	questionList.push(newQuestion);

	fs.writeFileSync('./questions.json', JSON.stringify(questionList));

	res.redirect('/answer');
});

app.get('/randomquestion', (req, res) => {
	let questionList = JSON.parse(fs.readFileSync('./questions.json'));

	if(questionList.length > 0) {
		let randomIndex = Math.floor(Math.random()*questionList.length);
		let questionRandom = questionList[randomIndex];
		res.send(questionRandom);
	}
}); 

app.get('/voteQuest', (req, res) => {
    if (questionList.length > 0) {
        let voteQuest = questionRandom;
        res.send(voteQuest);
    }
});

app.post('/answer', function(req, res) {
	const { questionid, answer } = req.body;
	// const questionid = req.body.questionid;
	// const answer = req.body.answer;

	let questionList = JSON.parse(fs.readFileSync('./questions.json'));
	console.log(questionList);
	questionList[questionid][answer] += 1;
	fs.writeFileSync('./questions.json', JSON.stringify(questionList));
	res.send({ success: 1 });
});

app.use(express.static('public'));

const port = 9000
app.listen(port, (err) => {
	if(err) console.log(err)
	else console.log(`Server is listening at port ${port}`);
});