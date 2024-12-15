import db from "../db/connectMysqlDB.js";

export const createUsersTable = () => {
	const query = `
    CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, usertype VARCHAR(255)
    )
  `;

	db.query(query, (err, result) => {
		if (err) {
			console.error("Error creating Users table:", err.message);
		} else {
			console.log("Users table created successfully.");
		}
	});
};
