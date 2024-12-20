import db from "../db/connectMysqlDB.js";
import { generatePostID } from "../utils/generatePostId.js";

export const createComment = (req, res) => {
	const { postID, userID, comment } = req.body; // Include userID in the request
	const commentID = generatePostID(); // Generate random 20-character commentID

	const insertQuery = `INSERT INTO comments (comment_id, user_id, post_id, comment_text) VALUES (?, ?, ?, ?)`;

	db.query(insertQuery, [commentID, userID, postID, comment], (err, result) => {
		if (err) {
			console.error("Error creating comment:", err.message);
			return res.status(500).json({ error: "Failed to create comment" });
		}

		res.status(201).json({
			message: "Comment created successfully",
			commentID: commentID, // Return the generated commentID to the client
			comment: comment,
		});
	});
};

export const getComments = (req, res) => {
	const { postID } = req.params; // Use postID from the request parameters

	const selectQuery = "SELECT * FROM comments WHERE post_id = ?";

	db.query(selectQuery, [postID], (err, results) => {
		if (err) {
			console.error("Error fetching comments:", err.message);
			return res.status(500).json({ error: "Failed to fetch comments" });
		}

		if (results.length === 0) {
			return res.status(404).json({ error: "No comments found for this post" });
		}

		res.status(200).json(results); // Return all comments for the post
	});
};

export const deleteComment = (req, res) => {
	const { commentId } = req.params; // Get the comment ID from the request parameters

	// SQL query to delete the comment by ID
	const deleteQuery = "DELETE FROM comments WHERE comment_id = ?";

	db.query(deleteQuery, [commentId], (err, result) => {
		if (err) {
			console.error("Error deleting comment:", err.message);
			return res.status(500).json({ error: "Failed to delete comment" });
		}

		if (result.affectedRows === 0) {
			// If no rows were affected, the comment does not exist
			return res.status(404).json({ error: "Comment not found" });
		}

		// Successfully deleted the comment
		res.status(200).json({ message: "Comment deleted successfully" });
	});
};
