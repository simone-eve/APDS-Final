import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Home.css'; // Import the CSS file

function Home() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handler to navigate to Employees page
  const handleEmpClick = () => {
    navigate('/emp-login'); // Navigate to Employees page
  };

  // Handler to navigate to Dashboard
  const handleUserClick = () => {
    navigate('/dashboard'); // Navigate to Dashboard page
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Employee Dashboard</h1>
      <p>Please Login to Proceed to the next page</p>
      <div className="home-buttons">
        <button className="home-button" onClick={handleEmpClick}>emp</button> {/* Button for Employees */}
        <button className="home-button" onClick={handleUserClick}>user</button> {/* Button for Dashboard */}
      </div>
    </div>
  );
}

export default Home;
