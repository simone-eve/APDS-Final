import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
//___________code attribution___________
//The following code was taken from Stack Overflow
//Author:  Unkown
//Link: https://stackoverflow.com/questions/54952355/how-to-post-data-from-react

const Dashboard = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/payments');
        if (!response.ok) {
          throw new Error('Failed to fetch payments');
        }
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);



  const handleAddUserClick = () => {
    navigate('/payment-form');
  };

  if (loading) {
    return <p className="loading-message">Loading payments...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Payments Dashboard</h2>
      {payments.length === 0 ? (
        <p>No payments available.</p>
      ) : (
        <table className="payments-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Currency</th>
              <th>Provider</th>
              <th>Recipient's Name</th>
              <th>Account Number</th>
              <th>Bank Name</th>
              <th>SWIFT Code</th>
              <th>Verification</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.amount}</td>
                <td>{payment.currency}</td>
                <td>{payment.provider}</td>
                <td>{payment.recipientName}</td>
                <td>{payment.accountNumber}</td>
                <td>{payment.bankName}</td>
                <td>{payment.swiftCode}</td>
                <td>{payment.verification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="button" onClick={handleAddUserClick}>Make New Payment</button>
    </div>
  );
};

export default Dashboard;