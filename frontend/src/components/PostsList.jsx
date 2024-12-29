import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PostsList.css";

const PostsList = ({ userId }) => {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState(false);

	const fetchPosts = async () => {
		try {
			const token = localStorage.getItem("token");
			const endpoint = filter
				? `http://localhost:5000/api/posts/${userId}`
				: "http://localhost:5000/api/posts";
			const response = await axios.get(endpoint, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setPosts(response.data);
		} catch (error) {
			console.error(
				"Failed to fetch posts:",
				error.response?.data || error.message
			);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, [filter, userId]);

	return (
		<div className="posts-list">
			<h3>Posts</h3>
			<button onClick={() => setFilter(!filter)} className="filter-button">
				{filter ? "Show All Posts" : "Filter My Posts"}
			</button>
			{posts.map((post) => (
				<div key={post.postID} className="post">
					<h4>{post.title}</h4>
					<p>{post.description}</p>
					{post.picture && <img src={post.picture} alt={post.title} />}
				</div>
			))}
		</div>
	);
};

export default PostsList;
