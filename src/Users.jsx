import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([]);
useEffect(() => {
    axios.get('https://crud-server-ashy.vercel.app')
        .then(result => {
            console.log(result.data); // Check this in the browser console
            setUsers(result.data);
        })
        .catch(err => console.log(err));
}, []);
    const handleDelete = (id) => {
        axios.delete('https://crud-server-ashy.vercel.app/deleteUser/' + id)
            .then(res => {
                console.log(res);
                // Filter out the deleted user from the users array
                setUsers(users.filter(user => user._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Link to="/create">Add +</Link> &nbsp; &nbsp; 
            <Link to="/register">Registration</Link><br />
            <Link to="/chatbot">chatbot</Link>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>
                                <Link to={`/update/${user._id}`}>Update</Link>
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
