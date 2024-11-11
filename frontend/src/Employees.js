import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Employees.css'; // Adjust the path if necessary


const Employees = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // New loading state
    const navigate = useNavigate(); 

    //___________code attribution___________
    //The following code was taken from Stack Overflow
    //Author:  Unkown
    //Link: https://stackoverflow.com/questions/54952355/how-to-post-data-from-react

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true when submitting

        
        // Email validation regex
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setLoading(false);
            setMessage('Please enter a valid email address');
            return;
        }

        // Password validation regex (example: at least one letter, one number, and at least 6 characters)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            setLoading(false);
            setMessage('Password must be at least 6 characters long and contain both letters and numbers');
            return;
        }

        try {
            const response = await fetch('https://apds-final.onrender.com/api/register', {
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
    const handleDashboardClick = () => {
        navigate('/dashboard'); // Navigate to Dashboard
      };

    return (
        <div>
            <h1>Add New Employee</h1>
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
                <button onClick={handleDashboardClick} className="dashboard-button">
                Dashboard
                </button>
                {/* Disable button while loading */}
            </form>
            {loading && <p>Loading...</p>} {/* Show loading indicator */}
            {message && <p>{message}</p>} {/* Display success or failure message */}
        </div>
    );
};

export default Employees;
