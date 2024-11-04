import React from 'react'; // Import React
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router
import Employees from './Employees'; // Import the Employees component
import Home from './Home'; // Import the Home component
import EmpLogin from './EmpLogin'; // Import the EmpLogin component
import AddUser from './AddUser'; // Import the AddUser component
import PaymentForm from './PaymentForm'; // Import the PaymentForm component
import Dashboard from './Dashboard'; // Import the Dashboard component

function App() {
  console.log("Rendering App component");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/employees" element={<Employees />} /> {/* Employees page */}
          <Route path="/emp-login" element={<EmpLogin />} /> {/* EmpLogin page */}
          <Route path="/add-user" element={<AddUser />} /> {/* AddUser page */}
          <Route path="/payment-form" element={<PaymentForm />} /> {/* PaymentForm page */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
