import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './User.css'; // Import your CSS file for styling

//___________code attribution___________
//The following code was taken from Stack Overflow
//Author:  Unkown
//Link: https://stackoverflow.com/questions/54952355/how-to-post-data-from-react
const User = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Regex for ID number (example: valid South African ID number - 13 digits)
    const idNumberRegex = /^[0-9]{13}$/;
    // Regex for Account number (example: 10-digit account number)
    const accountNumberRegex = /^[0-9]{10}$/;
    // Regex for Password (example: at least 8 characters, 1 letter, and 1 number)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!idNumberRegex.test(idNumber)) {
      setLoading(false);
      setMessage('Invalid ID number. Please enter a valid 13-digit number.');
      return;
    }

    if (!accountNumberRegex.test(accountNumber)) {
      setLoading(false);
      setMessage('Invalid Account number. Please enter a valid 10-digit number.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setLoading(false);
      setMessage('Password must be at least 8 characters long and contain both letters and numbers.');
      return;
    }

    const user = {
      fullName,
      idNumber,
      accountNumber,
      userId,
      password,
    };

    try {
      const response = await fetch('https://apds-final.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setMessage('User added successfully!');
        setFullName('');
        setIdNumber('');
        setAccountNumber('');
        setUserId('');
        setPassword('');

        // Optionally navigate to PaymentForm on successful user addition
        // navigate('/payment-form'); 
      } else {
        setMessage(data.message || 'Failed to add user');
      }
    } catch (error) {
      setLoading(false);
      setMessage('Failed to add user. Please try again later.');
    }
  };

  const handleDashboardClick = () => {
    navigate('/dashboard'); // Navigate to Dashboard
  };

  return (
    <div className="user-container">
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
        <label>
          ID Number:
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Account Number:
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </label>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add User'}
        </button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={handleDashboardClick} className="dashboard-button">
        Dashboard
      </button>
    </div>
  );
};

export default User;
