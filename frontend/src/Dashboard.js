import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import your CSS file

const Dashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/payments'); // Ensure this endpoint is correct
        if (!response.ok) {
          throw new Error('Failed to fetch payments');
        }
        const data = await response.json();
        setPayments(data); // Assuming your API returns an array of payments
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

    // Update the local state to reflect the changes
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.id === paymentId ? { ...payment, verification: 'Verified' } : payment
      )
    );

    console.log(`Payment with ID ${paymentId} verified`);
  } catch (error) {
    setError(error.message);
  }
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
              <th>Verification</th> {/* Added verification column */}
              <th>Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}> {/* Adjust the key based on your payment data structure */}
                <td>{payment.amount}</td>
                <td>{payment.currency}</td>
                <td>{payment.provider}</td>
                <td>{payment.recipientName}</td>
                <td>{payment.accountNumber}</td>
                <td>{payment.bankName}</td>
                <td>{payment.swiftCode}</td>
                <td>{payment.verification}</td> {/* Display verification status */}
                <td>
                  <button 
                    className="button" 
                    onClick={() => handleVerify(payment.id)} // Call verify on click
                  >
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="button">Add Payment</button> {/* Example button */}
    </div>
  );
};

export default Dashboard;
