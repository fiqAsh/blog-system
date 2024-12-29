import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CreatePostForm from "../components/CreatePostForm";
import PostsList from "../components/PostsList";
import UserList from "../components/UserList";
import axios from "axios";
import "./HomePage.css";

const HomePage = () => {
	const [userId, setUserId] = useState(null);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get("http://localhost:5000/api/auth/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setUserId(response.data.userId);
			} catch (error) {
				console.error(
					"Failed to fetch user:",
					error.response?.data || error.message
				);
			}
		};

		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/auth/users"
				);
				setUsers(response.data);
			} catch (error) {
				console.error(
					"Failed to fetch users:",
					error.response?.data || error.message
				);
			}
		};

		fetchUser();
		fetchUsers();
	}, []);

	return (
		<div className="homepage">
			<Navbar />
			<div className="content">
				<div className="left">
					<CreatePostForm
						onPostCreated={(newPost) => console.log("New Post:", newPost)}
					/>
					<PostsList userId={userId} />
				</div>
				<div className="right">
					<UserList users={users} />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
