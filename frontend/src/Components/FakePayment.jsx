import React, { useState } from 'react';

// Define a fake payment component
const FakePaymentApp = () => {
  // State variables to store payment details
  const [cardNumber, setCardNu7mber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  // Function to handle payment submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate payment processing
    // Here you could add validation and error handling logic
    // For simplicity, we're just setting the payment status to "Success"
    setPaymentStatus('Success');
  };

  return (
    <div>
      <h1>Fake Payment App</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => {
              e.target.value
              
              setCardNumber(formattedValue);
              console.log(e.target.value); // Check if formatted value is correct
            }}
            required
          />

       </div>
        <div>
          <label>Expiry Date:</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CVC:</label>
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCVC(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Payment</button>
      </form>
      {paymentStatus && (
        <div>
          Payment Status: <strong>{paymentStatus}</strong>
        </div>
      )}
    </div>
  );
};

export default FakePaymentApp;
