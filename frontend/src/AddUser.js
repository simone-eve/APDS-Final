import React, { useState } from 'react';

const AddUser = () => {
  // State to hold form data
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  // State to hold message and its type
  const [message, setMessage] = useState({ text: '', type: '' });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
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
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const data = await response.json();
      console.log('User added:', data);

      // Set success message
      setMessage({ text: 'User added successfully!', type: 'success' });

      // Clear the form after submission
      setFullName('');
      setIdNumber('');
      setAccountNumber('');
      setUserId('');
      setPassword('');
    } catch (error) {
      console.error('Error adding user:', error);
      // Set error message
      setMessage({ text: 'Failed to add user. Please try again.', type: 'error' });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div>
          <label>ID Number:</label>
          <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required />
        </div>
        <div>
          <label>Account Number:</label>
          <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
        </div>
        <div>
          <label>User ID:</label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Add User</button>
      </form>
      {message.text && (
        <div style={{ marginTop: '10px', color: message.type === 'success' ? 'green' : 'red' }}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AddUser;
