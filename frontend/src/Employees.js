import React, { useState } from 'react';
import './Employees.css'; // Adjust the path if necessary

const Employees = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // New loading state
//___________code attribution___________
//The following code was taken from Stack Overflow
//Author:  Unkown
//Link: https://stackoverflow.com/questions/54952355/how-to-post-data-from-react
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true when submitting

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, surname, email, password }),
            });

            const data = await response.json();
            setLoading(false); // Set loading to false after response

            if (response.ok) {
                setMessage(data.message); // Success message
                // Clear input fields
                setName('');
                setSurname('');
                setEmail('');
                setPassword('');
            } else {
                // Log error response for debugging
                console.error('Registration error:', data);
                setMessage(data.message || 'Registration failed.'); // Failure message
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setLoading(false);
            setMessage('An error occurred. Please try again later.'); // Network error message
        }
    };

    return (
        <div>
            <h1>Welcome, Please Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Surname:
                        <input
                            type="text"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
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
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit" disabled={loading}>Register</button>
                {/* Disable button while loading */}
            </form>
            {loading && <p>Loading...</p>} {/* Show loading indicator */}
            {message && <p>{message}</p>} {/* Display success or failure message */}
        </div>
    );
};

export default Employees;
