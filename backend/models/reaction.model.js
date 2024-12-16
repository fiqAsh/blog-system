import db from "../db/connectMysqlDB.js";

const createReactionsTable = () => {
	const query = `
    CREATE TABLE IF NOT EXISTS reactions (
        reactionID VARCHAR(16) PRIMARY KEY,
        postID VARCHAR(16) NOT NULL,
        likes INT DEFAULT 0,
        comments INT DEFAULT 0,
        shares INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (postID) REFERENCES posts(postID) ON DELETE CASCADE
    )
  `;

	db.query(query, (err, result) => {
		if (err) {
			console.error("Error creating Reactions table:", err.message);
		} else {
			console.log("Reactions table created successfully.");
		}
	});
};

createReactionsTable();

export default createReactionsTable;
