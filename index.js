const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const mysql = require("mysql");

app.use(bodyParser.json());

const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "crud",
});

conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});
app.get('/', (req, res) =>{
	res.send('<h2 style="color: purple">Nikhil Jagadish Gharate<h2>');
});

// creat a new Record
app.post("/api/create", (req, res) => {
	let data = { name: req.body.name, email: req.body.email,salary:req.body.salary};
	let sql = "INSERT INTO users SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ statuscode: 200, message:"Success", result: [] }));
	});
});

//show all records
app.get("/api/view", (req, res) => {
	let sql = "SELECT * FROM users";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({  response: result }));
	});
});

// show a single record
app.get("/api/view/:id", (req, res) => {
	let sql = "SELECT * FROM users WHERE id=" + req.params.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ response: result }));
	});
});

// delete the record
app.delete("/api/delete/:id", (req, res) => {
	let sql = "DELETE FROM users WHERE id=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ statuscode: 200, message:"Success", result: [] }));
	});
});

// update the Record
app.put("/api/update/", (req, res) => {
	let sql = "UPDATE users SET name='" + req.body.name + "', email='" + req.body.email +"',salary='" + req.body.salary + "' WHERE id=" + req.body.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ statuscode: 200, message:"Success", result: [] }));
	});
});

app.listen(8000, () => {
	console.log("server started on port 8000...");
});

