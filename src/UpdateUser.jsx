import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateUser() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [image, setImage] = useState(null); // New state for image
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://crud-server-roan.vercel.app/getUser/' + id)
            .then(result => {
                console.log(result);
                setName(result.data.name);
                setEmail(result.data.email);
                setAge(result.data.age);
            })
            .catch(err => console.log(err));
    }, [id]);

    const Update = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('age', age);
        if (image) {
            formData.append('image', image); // Append image file if selected
        }

        axios.put("https://crud-server-roan.vercel.app/updateUser/" + id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            console.log(result);
            navigate('/');
        })
        .catch(err => console.log(err));
    };

    return (
        <div>
            <form onSubmit={Update}>
                <h2>Update User</h2>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Age:
                        <input
                            type="text"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Image:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                </div>
                <button className="btn btn-success" type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateUser;