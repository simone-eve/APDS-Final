import React, { useState } from 'react'; // Import React and useState
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const EmpLogin = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [name, setName] = useState(''); // State for name
    const [surname, setSurname] = useState(''); // State for surname
    const [email, setEmail] = useState(''); // State for email
    const [password, setPassword] = useState(''); // State for password
    const [message, setMessage] = useState(''); // State for messages (success/error)
    const [loading, setLoading] = useState(false); // State for loading

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setLoading(true); // Set loading to true

        const response = await fetch('https://apds-final.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, surname, email, password }), // Send data
        });

        const data = await response.json(); // Parse the JSON response
        setLoading(false); // Set loading to false

        if (response.ok) {
            setMessage(data.message); // Success message
            setName(''); // Clear input fields
            setSurname('');
            setEmail('');
            setPassword('');

            // Redirect to Dashboard after successful login
            navigate('/dashboard'); // Navigate to Dashboard page
        } else {
            setMessage(data.message); // Error message
        }
    };

    return (
        <div>
            <h1>Employee Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Update state on change
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
                            onChange={(e) => setSurname(e.target.value)} // Update state on change
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
                            onChange={(e) => setEmail(e.target.value)} // Update state on change
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
                            onChange={(e) => setPassword(e.target.value)} // Update state on change
                            required
                        />
                    </label>
                </div>
                <button type="submit" disabled={loading}>Login</button> {/* Disable while loading */}
            </form>
            {loading && <p>Loading...</p>} {/* Loading message */}
            {message && <p>{message}</p>} {/* Success or error message */}
        </div>
    );
};

export default EmpLogin; // Default export
