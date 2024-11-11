import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  // Handler to navigate to Employees page

  //___________code attribution___________
//The following code was taken from Stack Overflow
//Author:  Unkown
//Link: https://stackoverflow.com/questions/54952355/how-to-post-data-from-react
  const handleEmpClick = () => {
    navigate('/emp-login');
  };

  // Handler to navigate to UserLogin page
  const handleUserClick = () => {
    navigate('/user-login'); // Navigate to UserLogin instead of Dashboard
  };

  return (
    <div className="home-container">
    <img src="https://i.postimg.cc/YCkzmLW8/Apds-Logo-removebg-preview-1.png" alt="Employee Dashboard" />
    <h1>Welcome to TransWorld Bank International Payments Portal</h1>
    <p>Please Login to Proceed to the next page</p>
    <div className="home-buttons">
      <button className="home-button" onClick={handleEmpClick}>Employee</button>
      <button className="home-button" onClick={handleUserClick}>User</button>
    </div>
  </div>
  );
}

export default Home;
