import React, { useState } from "react";
import axios from "axios";
import "./CreatePostForm.css";

const CreatePostForm = ({ onPostCreated }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [picture, setPicture] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem("token");
			const response = await axios.post(
				"http://localhost:5000/api/posts",
				{ title, description, picture },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			onPostCreated(response.data); // Inform parent component about the new post
			setTitle("");
			setDescription("");
			setPicture("");
		} catch (error) {
			console.error(
				"Failed to create post:",
				error.response?.data || error.message
			);
		}
	};

	return (
		<div className="create-post-form">
			<form onSubmit={handleSubmit}>
				<h3>Create Post</h3>
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<textarea
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				></textarea>
				<input
					type="text"
					placeholder="Picture URL"
					value={picture}
					onChange={(e) => setPicture(e.target.value)}
				/>
				<button type="submit">Post</button>
			</form>
		</div>
	);
};

export default CreatePostForm;
