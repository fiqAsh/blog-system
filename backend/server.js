import express from "express";

import db from "./db/connectMysqlDB.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("server is running");
});

const PORT = 5000;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);

	// Test the database connection
	db.connect((err) => {
		if (err) {
			console.error("Error connecting to the database:", err.message);
		} else {
			console.log("Connected to the database successfully!");
		}
	});
});