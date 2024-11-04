import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  // Handler to navigate to Employees page
  const handleEmpClick = () => {
    navigate('/emp-login');
  };

  // Handler to navigate to UserLogin page
  const handleUserClick = () => {
    navigate('/user-login'); // Navigate to UserLogin instead of Dashboard
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Employee Dashboard</h1>
      <p>Please Login to Proceed to the next page</p>
      <div className="home-buttons">
        <button className="home-button" onClick={handleEmpClick}>emp</button>
        <button className="home-button" onClick={handleUserClick}>user</button>
      </div>
    </div>
  );
}

export default Home;
