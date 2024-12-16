import db from "../db/connectMysqlDB.js";
import { generatePostID } from "../utils/generatePostId.js";

export const reactToPost = (req, res) => {
	const { postID, like, comment, share } = req.body;

	const checkQuery = `SELECT * FROM reactions WHERE postID = ?`;
	db.query(checkQuery, [postID], (err, results) => {
		if (err) {
			console.error("Error checking reactions:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}

		if (results.length === 0) {
			// No reactions exist for the post; create a new record
			const reactionID = generatePostID();
			const insertQuery = `
                INSERT INTO reactions (reactionID, postID, likes, comments, shares)
                VALUES (?, ?, ?, ?, ?)
            `;
			db.query(
				insertQuery,
				[reactionID, postID, like || 0, comment || 0, share || 0],
				(err) => {
					if (err) {
						console.error("Error inserting reaction:", err.message);
						return res.status(500).json({ error: "Failed to add reaction" });
					}

					res
						.status(201)
						.json({ message: "Reaction added successfully", reactionID });
				}
			);
		} else {
			// Reaction exists; update the record
			const updateQuery = `
                UPDATE reactions
                SET likes = likes + ?, comments = comments + ?, shares = shares + ?
                WHERE postID = ?
            `;
			db.query(
				updateQuery,
				[like || 0, comment || 0, share || 0, postID],
				(err) => {
					if (err) {
						console.error("Error updating reaction:", err.message);
						return res.status(500).json({ error: "Failed to update reaction" });
					}

					res.status(200).json({ message: "Reaction updated successfully" });
				}
			);
		}
	});
};

export const getReactionsForPost = (req, res) => {
	const { postID } = req.params;

	const query = `SELECT * FROM reactions WHERE postID = ?`;

	db.query(query, [postID], (err, results) => {
		if (err) {
			console.error("Error fetching reactions:", err.message);
			return res.status(500).json({ error: "Internal server error" });
		}

		if (results.length === 0) {
			return res
				.status(404)
				.json({ error: "No reactions found for this post" });
		}

		res.status(200).json(results[0]);
	});
};
