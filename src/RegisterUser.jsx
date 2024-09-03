import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function RegisterUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!name && !email && !password) {
            setError("Please fill in all fields.");
            return;
        }

        // Validate email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Validate password length (e.g., at least 6 characters)
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        axios.post("https://crud-server-roan.vercel.app/register", { name, email, password })
            .then(res => {
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
                setError("An error occurred. Please try again later.");
            });
    }

    return(
        <div>
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Register</button>
                <Link to="/login">Login</Link>
            </form>
        </div>
    );
}

export default RegisterUser;
