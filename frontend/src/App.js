import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Employees from './Employees';
import Home from './Home';
import EmpLogin from './EmpLogin';
import PaymentForm from './PaymentForm';
import Dashboard from './Dashboard';
import UserLogin from './UserLogin'; // Import the UserLogin component
import User from './User';
function App() {
  console.log("Rendering App component");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/emp-login" element={<EmpLogin />} />
          <Route path="/payment-form" element={<PaymentForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-login" element={<UserLogin />} /> {/* Add UserLogin route */}
          <Route path="/user" element={<User />} /> {/* Add UserLogin route */}
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
