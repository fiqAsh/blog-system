import db from "../db/connectMysqlDB.js";
import { generatePostID } from "../utils/generatePostId.js";

export const createPost = (req, res) => {
	const { title, description, picture } = req.body; // Expects only title, description, and picture from req.body
	const postID = generatePostID(); // Generate random 10-character ID

	const insertQuery = `INSERT INTO posts (postID, title, description, picture) VALUES (?, ?, ?, ?)`;

	db.query(
		insertQuery,
		[postID, title, description, picture],
		(err, result) => {
			if (err) {
				console.error("Error inserting post:", err.message);
				return res.status(500).json({ error: "Failed to create post" });
			}

			res.status(201).json({
				message: "Post created successfully",
				postId: postID, // Return the generated postID to the client
			});
		}
	);
};

export const getPost = (req, res) => {
	const selectQuery = "SELECT * FROM posts";

	db.query(selectQuery, (err, results) => {
		if (err) {
			console.error("Error fetching posts:", err.message);
			return res.status(500).json({ error: "Failed to fetch posts" });
		}

		res.status(200).json(results);
	});
};

export const updatePost = (req, res) => {
	const { postId } = req.params;
	const { title, description, picture } = req.body;

	const updateQuery = `UPDATE posts SET title = ?, description = ?, picture = ? WHERE postID = ?`;

	db.query(
		updateQuery,
		[title, description, picture, postId],
		(err, result) => {
			if (err) {
				console.error("Error updating post:", err.message);
				return res.status(500).json({ error: "Failed to update post" });
			}

			if (result.affectedRows === 0) {
				return res.status(404).json({ error: "Post not found" });
			}

			res.status(200).json({ message: "Post updated successfully" });
		}
	);
};

export const deletePost = (req, res) => {
	const { postId } = req.params;

	const deleteQuery = "DELETE FROM posts WHERE postID = ?";

	db.query(deleteQuery, [postId], (err, result) => {
		if (err) {
			console.error("Error deleting post:", err.message);
			return res.status(500).json({ error: "Failed to delete post" });
		}

		if (result.affectedRows === 0) {
			return res.status(404).json({ error: "Post not found" });
		}

		res.status(200).json({ message: "Post deleted successfully" });
	});
};
