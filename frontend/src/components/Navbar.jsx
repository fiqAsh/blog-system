import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		// Clear the JWT token from localStorage (or cookies)
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="navbar">
			<div className="navbar-container">
				<button onClick={() => navigate("/")}>Home</button>
				<button onClick={() => navigate("/profile")}>Profile</button>
				<button onClick={handleLogout}>Logout</button>
			</div>
		</nav>
	);
};

export default Navbar;
