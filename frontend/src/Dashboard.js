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

  const handleVerify = async (paymentId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/payments/${paymentId}/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to verify payment');
      }
//___________code attribution___________
//The following code was taken from Stack Overflow
//Author:  Unkown
//Link: https://stackoverflow.com/questions/54952355/how-to-post-data-from-react
      const updatedPayment = await response.json();
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === updatedPayment._id ? updatedPayment : payment
        )
      );

      console.log(`Payment with ID ${paymentId} verified`);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddUserClick = () => {
    navigate('/user');
  };
  const handleAddEmployeeClick = () => {
    navigate('/employees');
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
              <th>Actions</th>
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
                <td>
                  <button 
                    className="button" 
                    onClick={() => handleVerify(payment._id)}
                  >
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="button" onClick={handleAddUserClick}>Add new user</button>
      <button className="button" onClick={handleAddEmployeeClick}>Add new employee</button>
    </div>
  );
};

export default Dashboard;
