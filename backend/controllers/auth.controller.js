import db from "../db/connectMysqlDB.js";

export const signup = (req, res) => {
	const { username, email, password } = req.body;

	const checkQuery = "SELECT email FROM users WHERE email = ?";

	db.query(checkQuery, [email], (err, result) => {
		if (err) {
			console.error("Error checking email:", err.message);
			return res.status(500).json({ error: "internal server error" });
		}

		if (result.length > 0) {
			return res.status(400).json({ error: "Email already exists" });
		}

		const insertQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

		db.query(insertQuery, [username, email, password], (err, result) => {
			if (err) {
				console.error("Error inserting user:", err.message);
				return res.status(500).json({ error: "failed to sign up user" });
			}
		});

		res.status(201).json({
			message: "User signed up successfully",
			userId: result.insertId,
		});
	});
};

export const login = (req, res) => {
	const { email, password } = req.body;

	// Check if the email exists in the database
	const query = "SELECT * FROM users WHERE email = ?";
	db.query(query, [email], (err, results) => {
		if (err) {
			console.error("Error checking user:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}

		if (results.length === 0) {
			// Email not found
			return res.status(404).json({ error: "User not found" });
		}

		const user = results[0];

		// Check if the provided password matches the stored password
		if (user.password !== password) {
			return res.status(401).json({ error: "Invalid password" });
		}

		// If email and password are correct
		res.status(200).json({
			message: "Login successful",
			user: {
				username: user.username,
				email: user.email,
			},
		});
	});
};
