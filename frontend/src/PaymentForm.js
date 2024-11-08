import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentForm.css';

const PaymentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    provider: 'SWIFT',
    recipientName: '',
    accountNumber: '',
    bankName: '',
    swiftCode: '',
  });
  const [message, setMessage] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    // Retrieve the full name from sessionStorage
    const storedFullName = sessionStorage.getItem('fullName');
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Include the fullName in paymentData
    const paymentData = {
      ...formData,
      verification: 'Pending',
      userFullName: fullName, // Add full name to payment data
    };

    try {
      const response = await fetch('https://apds-final.onrender.com/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Payment added successfully!');
        setFormData({
          amount: '',
          currency: 'USD',
          provider: 'SWIFT',
          recipientName: '',
          accountNumber: '',
          bankName: '',
          swiftCode: '',
        });
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      setMessage('Error submitting payment. Please try again later.');
    }
  };

  return (
    <div className="payment-form-container">
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>Payment Form</h2>
        {message && <div className="message">{message}</div>}
        <div className="form-group">
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Currency:
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
              <option value="CAD">CAD</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Provider:
            <select
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              required
            >
              <option value="SWIFT">SWIFT</option>
              <option value="SEPA">SEPA</option>
              <option value="ACH">ACH</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Recipient Name:
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Account Number:
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Bank Name:
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            SWIFT Code:
            <input
              type="text"
              name="swiftCode"
              value={formData.swiftCode}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" className="submit-button">Submit Payment</button>
        <button type="button" onClick={() => navigate('/userDashboard')} className="dashboard-button">
          Dashboard
        </button>
      </form>
    </div>
  );
};

export default PaymentForm; // Make sure to export the component properly
