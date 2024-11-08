import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Home.css'; // Import your CSS file

function UserLogin() {
    const [fullName, setFullName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (event) => {
        event.preventDefault();
        
        // Send login data to backend
        const response = await fetch('https://apds-final.onrender.com/api/userLogin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, accountNumber, password }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage(data.message);
            
            // Save the account number to session storage or local storage
            sessionStorage.setItem('accountNumber', accountNumber); // For session storage
            // or use localStorage.setItem('accountNumber', accountNumber); // For local storage
            
            navigate('/payment-form'); // Redirect to PaymentForm on successful login
        } else {
            setMessage(data.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="home-container">
            <h1>User Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="login-input" // Custom class for input styling
                    />
                </div>
                <div>
                    <label>Account Number:</label>
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                        className="login-input" // Custom class for input styling
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input" // Custom class for input styling
                    />
                </div>
                <button className="home-button" type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UserLogin;
