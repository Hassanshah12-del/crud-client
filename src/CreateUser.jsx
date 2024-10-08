import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();

        // Validate that all fields are filled
        if (!name || !email || !age ) { // Include image in validation
            setError("Please fill in all fields and upload an image.");
            return;
        }

        // Validate email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Validate that age is a number
        if (isNaN(age) || age <= 0) {
            setError("Please enter a valid age.");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('age', age);

        axios.post("https://crud-server-ashy.vercel.app/createUser", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            console.log(result);
            navigate('/');
        })
        .catch(err => {
            console.log(err);
            setError("An error occurred. Please try again later.");
        });
    }

    return (
        <div>
            <form onSubmit={Submit}>  
                <h2>Create User</h2>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Age:
                        <input
                            type="text"
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </label>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateUser;
