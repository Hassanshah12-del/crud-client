import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if both fields are filled
        if (!email && !password) {
            setError("Please fill in both email and password.");
            return;
        }

        // Check if the email field is filled
        else if (!email) {
            setError("Please fill the email field.");
            return;
        }

        // Check if the email format is correct
        else if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Check if the password field is filled
        else if (!password) {
            setError("Please fill the password field.");
            return;
        }

        axios.post("https://crud-client-five.vercel.app/login", { email, password })
            .then(res => {
                if (res.data.Status === "Success") {
                    if (res.data.role === "admin") {
                        navigate("/dashboard");
                    } else {
                        navigate("/home");
                    }
                } else {
                    setError("Login failed. Please try again.");
                }
            })
            .catch(err => {
                console.log(err);
                setError("An error occurred. Please try again later.");
            });
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Log in</button>
                <Link to="/register">Sign Up</Link>
            </form>
        </div>
    );
}

export default Login;
