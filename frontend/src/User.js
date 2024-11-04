import React, { useState } from 'react';
import './User.css'; // Import your CSS file for styling

const User = () => {
  const [fullName, setFullName] = useState(''); // State for full name
  const [idNumber, setIdNumber] = useState(''); // State for ID number
  const [accountNumber, setAccountNumber] = useState(''); // State for account number
  const [userId, setUserId] = useState(''); // State for user ID
  const [password, setPassword] = useState(''); // State for password
  const [message, setMessage] = useState(''); // State for messages (success/error)
  const [loading, setLoading] = useState(false); // State for loading

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading to true

    // Create the user object
    const user = {
      fullName,
      idNumber,
      accountNumber,
      userId,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user), // Send user data
      });

      const data = await response.json(); // Parse the JSON response
      setLoading(false); // Set loading to false

      if (response.ok) {
        setMessage('User added successfully!'); // Success message
        // Optionally clear the form fields
        setFullName('');
        setIdNumber('');
        setAccountNumber('');
        setUserId('');
        setPassword('');
      } else {
        setMessage(data.message); // Error message
      }
    } catch (error) {
      setLoading(false);
      setMessage('Failed to add user.'); // Handle fetch error
    }
  };

  return (
    <div className="user-container">
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Full Name:
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)} // Update state on change
              required
            />
          </label>
        </div>
        <div>
          <label>
            ID Number:
            <input
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)} // Update state on change
              required
            />
          </label>
        </div>
        <div>
          <label>
            Account Number:
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)} // Update state on change
              required
            />
          </label>
        </div>
        <div>
          <label>
            User ID:
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)} // Update state on change
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
        <button type="submit" disabled={loading}>Add User</button> {/* Disable while loading */}
      </form>
      {loading && <p>Loading...</p>} {/* Loading message */}
      {message && <p>{message}</p>} {/* Success or error message */}
    </div>
  );
};

export default User; // Default export
