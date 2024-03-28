import React, { useState } from 'react';

const Validate = () => {
  const [nic, setNic] = useState('');
  const [nicDetails, setNicDetails] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setNic(event.target.value);
  };

  const handleValidate = () => {
    // Check if NIC is a valid numeric value
    if (!validateNIC(nic)) {
      setError('Invalid NIC format. NIC should be a valid numeric value.');
      setNicDetails(null);
      return;
    }

    // Example of setting details without actual API call
    // Replace this with your actual API call to fetch NIC details
 
    setError('');
  };

  // Function to validate NIC as a numeric value
  const validateNIC = (nic) => {
    return /^\d+$/.test(nic);
  };

  return (
    <div>
      <h1>Validate Employee</h1>
      <label>NIC:</label>
      <input type="text" value={nic} onChange={handleChange} />
      <button onClick={handleValidate}>Validate NIC</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {nicDetails && (
        <div>
          <h2>NIC Details:</h2>
          <p>Name: {nicDetails.name}</p>
          <p>Position: {nicDetails.position}</p>
        </div>
      )}
    </div>
  );           
};

export default Validate;
