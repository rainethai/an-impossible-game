var express = require("express");
var app = express();
// Require database SCRIPT file
var db = require("./database.js");
// Require md5 MODULE
var md5 = require("md5");
var cors = require("cors");
const { Router } = require("express");
const { reset } = require("browser-sync");
// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const questions = [
	{
		id: 1,
		question: "What color is the sky?",
		answers: {
			answerOne: "Blue",
			answerTwo: "Black",
			answerThree: "Sky Blue",
			answerFour: "The sky is the limit.",
			correctAnswer: "4",
		},
	},
	{
		id: 2,
		question: "What color is the ground",
		answers: {
			answerOne: "Red",
			answerTwo: "Brown",
			answerThree: "Beef?",
			answerFour: "Green",
			correctAnswer: "3",
		},
	},
	{
		id: 3,
		question: "How fast sonic go?",
		answers: {
			answerOne: "too fast",
			answerTwo: "way slow",
			answerThree: "Slowbro",
			answerFour: "he no move",
			correctAnswer: "3",
		},
	},
	{
		id: 4,
		question: "Can I use the bathroom?",
		answers: {
			answerOne: "Can you?",
			answerTwo: "Yes",
			answerThree: "No",
			answerFour: "May I",
			correctAnswer: "2",
		},
	},
	{
		id: 5,
		question: "Ooga Ooga Ooga?",
		answers: {
			answerOne: "Oog?",
			answerTwo: "Ooga",
			answerThree: "Eeg",
			answerFour: "What are you doing?",
			correctAnswer: "2",
		},
	},
	{
		id: 6,
		question: "Where are we going?",
		answers: {
			answerOne: "Under water",
			answerTwo: "To the airport",
			answerThree: "No where",
			answerFour: "Home",
			correctAnswer: "3",
		},
	},
	{
		id: 7,
		question:
			"What did the Cell say to its sister Cell, when it bumped into it?",
		answers: {
			answerOne: "Hello, my fellow Cell",
			answerTwo: "Ow, mi-to-sis",
			answerThree: "Cell’s do not speak",
			answerFour: "I have no knowledge of cells.",
			correctAnswer: "2",
		},
	},
	{
		id: 8,
		question: "Who is calling?",
		answers: {
			answerOne: "Your mom, pick up!",
			answerTwo: "Ghosts!",
			answerThree: "The Hash-Slinging Slasher",
			answerFour: "Your delivery driver",
			correctAnswer: "3",
		},
	},
	{
		id: 9,
		question:
			"What smells like blue paint, tastes like blue paint, and is red?",
		answers: {
			answerOne: "Red Paint",
			answerTwo: "Paint?",
			answerThree: "Paint is not for consumption. Why did you taste it?",
			answerFour: "I can’t come up with another answer to this question.",
			correctAnswer: "4",
		},
	},
	{
		id: 10,
		question: "Why am I crying?",
		answers: {
			answerOne: "My roommate is cutting onions.",
			answerTwo: "I broke my great-aunt’s favorite vase.",
			answerThree: "I got this question wrong",
			answerFour: "the world is dark and sad",
			correctAnswer: "3",
		},
	},
	{
		id: 11,
		question: "What’s that smell?",
		answers: {
			answerOne: "Despair",
			answerTwo: "Double chocolate chip cookies!",
			answerThree: "My gym teacher’s socks",
			answerFour: "A completed Lego set.",
			correctAnswer: "1",
		},
	},
	{
		id: 12,
		question: "Who is the best Avenger?",
		answers: {
			answerOne: "Thor",
			answerTwo: "Anyone, literally anyone",
			answerThree: "Aunt May",
			answerFour: "The Infinity Stones.",
			correctAnswer: "2",
		},
	},
	{
		id: 13,
		question: "What is the best class?",
		answers: {
			answerOne: "COMP 426",
			answerTwo: "BIOL 101",
			answerThree: "CHEM 101",
			answerFour: "ENGL 105",
			correctAnswer: "1",
		},
	},
	{
		id: 14,
		question: "What is thy fav'rite food?",
		answers: {
			answerOne: "Zza",
			answerTwo: "Hamburg'r",
			answerThree: "Pasta",
			answerFour: "gudgeon",
			correctAnswer: "",
		},
	},
	{
		id: 15,
		question: "How did I get here?",
		answers: {
			answerOne: "The bus.",
			answerTwo: "Planes, trains, and automobiles.",
			answerThree: "BIRTH",
			answerFour: "I fell out of the sky",
			correctAnswer: "3",
		},
	},
];

// Set server port
var HTTP_PORT = "5000";
app.options("*", cors());
// Start server
app.listen(HTTP_PORT, () => {
	console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});
// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json({ message: "Your API works! (200)" });
	res.status(200);
});

// Define other CRUD API endpoints using express.js and better-sqlite3
// CREATE a new user (HTTP method POST) at endpoint /app/new/
app.post("/app/new/", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); //, "Content-Type", "application/json");
	const stmt = db.prepare("INSERT INTO userinfo (user, pass) VALUES (?, ?)");
	const info = stmt.run(req.body.user, req.body.pass);
	res.json(req.body.user);
});
// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	const stmt = db.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id
app.get("/app/user/:id", (req, res) => {
	// This appears to have been succesful.
	res.setHeader("Access-Control-Allow-Origin", "*");
	const stmt = db
		.prepare("SELECT * FROM userinfo WHERE id = ?")
		.get(req.params.id);
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id
app.get("/app/user/last", (req, res) => {
	// This appears to have been succesful.
	res.setHeader("Access-Control-Allow-Origin", "*");
	const stmt = db
		.prepare("SELECT id FROM playerhistory WHERE id = (SELECT MAX(id) FROM playerhistory)");
	const info = stmt.run()
	res.send(info);
});

// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:id
app.patch("/app/update/user/:user", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); //, "Content-Type", "application/json");
	const stmt = db.prepare(
		"UPDATE userinfo SET pass = COALESCE(?,pass) WHERE user = ?"
	);
	const info = stmt.run((req.body.pass), req.params.user);
	res.json({
		message:
			info.changes +
			" record updated: " +
			"ID " +
			req.params.user +
			" (200)",
	});
});

// UPDATE a user score if they score higher than before
app.patch("/app/update/highscores/:user", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); //, "Content-Type", "application/json");
	const stmt = db.prepare(
		"UPDATE userinfo SET user = COALESCE(?,user), pass = COALESCE(?,pass) WHERE id = ?"
	);
	const info = stmt.run(req.body.user, md5(req.body.score));
	res.json({
		message:
			info.changes +
			" (200)",
	});
});

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id
// app.delete("/app/delete/user/:id", (req, res) => {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	const stmt = db.prepare("DELETE FROM highscores WHERE id = ?");
// 	const info = stmt.run(req.params.id);
// 	res.json({
// 		message:
// 			info.changes +
// 			" record deleted: " +
// 			"ID " +
// 			req.params.id +
// 			" (200)",
// 	});
// });

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id
app.delete("/app/delete/user/:user", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	let stmt = db.prepare("DELETE FROM highscores WHERE user = ?");
	let info = stmt.run(req.params.user);
	res.json({
		"message": req
	});
});

app.delete("/app/delete/users/:user", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	let stmt = db.prepare("DELETE FROM userinfo WHERE user = ?");
	let info = stmt.run(req.params.user);
	res.json({
		"message": req
	});
});

// GET ALL QUESTIONS
app.get("/app/questions", function (req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.send(questions);
});

// GET A QUESTION USING ID
app.get("/app/questions/:id", function (req, res) {
	// Lets get the question here.
	res.setHeader("Access-Control-Allow-Origin", "*");
	let fail = true;
	for (let i = 0; i < questions.length; i++) {
		if (questions[i].id == parseInt(req.params.id)) {
			res.send(questions[i].question);
			fail = false;
			break;
		}
	}
	if (fail) {
		res.status(404).send("The question does not exist.");
	}
});

// GET ANSWER LIST
app.get("/app/questions/:id/answers", function (req, res) {
	// Lets get the answers here.
	res.setHeader("Access-Control-Allow-Origin", "*");
	let fail = true;
	for (let i = 0; i < questions.length; i++) {
		if (questions[i].id == parseInt(req.params.id)) {
			res.send(questions[i].answers);
			fail = false;
			break;
		}
	}
	if (fail) {
		res.status(404).send("The question does not exist.");
	}
});

// CHECK CORRECT ANSWER
app.get("/app/answer/:id/:choice", function (req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	let correctAnswer;
	for (let i = 0; i < questions.length; i++) {
		if (questions[i].id == req.params.id) {
			correctAnswer = questions[i].answers.correctAnswer;
		}
	}
	if (req.params.choice == correctAnswer || req.params.choice == 14) {
		res.send("True");
	} else {
		res.send("False");
	}
	//res.status(200);
});

app.post("/app", function (req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.send("Hello World");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
// We are ultimately only going to post and get from the table.
// CREATE a new user (HTTP method POST) at endpoint /app/new/lastPlayer
app.post("/app/new/lastPlayer/", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); //, "Content-Type", "application/json");
	const stmt = db.prepare("INSERT INTO lastplayers (user) VALUES (?)");
	const info = stmt.run(req.body.user);
	res.json(req);
});
// READ a list of all users (HTTP method GET) at endpoint /app/lastPlayers/
app.get("/app/lastPlayers/", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	const stmt = db.prepare("SELECT * FROM lastplayers").all();
	res.status(200).json(stmt);
});

// Post new playerhistory
app.post("app/new/playerhistory", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); //, "Content-Type", "application/json");
	const stmt = db.prepare(
		"INSERT INTO playerhistory (user, question, answer, point) VALUES (?, ?, ?, ?)"
	);
	const info = stmt.run(
		req.body.user,
		req.body.question,
		req.body.answer,
		req.body.point
	);
	res.json(req);
});

// Get all playerhistory
app.get("/app/playerhistory/", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	const stmt = db.prepare("SELECT * FROM playerhistory").all();
	res.status(200).json(stmt);
});
// post new highscores
app.post("/app/newHighscore", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); //, "Content-Type", "application/json");
	const stmt = db.prepare(
		"INSERT INTO highscores (user, score) VALUES (?, ?)"
	);
	const info = stmt.run(req.body.user, req.body.score);
	res.json(req);
});

// Get all high scores
app.get("/app/highscores/", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	const stmt = db.prepare("SELECT * FROM highscores").all();
	res.status(200).json(stmt);
});

// Default response for any other request
app.use(function (req, res) {
	res.json("Your API is working!");
	res.status(404);
});
