import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AddSalary = () => {
  const location = useLocation();
  const { employee } = location.state;

  const [salary, setSalary] = useState('');
  const [error, setError] = useState('');

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!salary) {
      setError('Please provide the salary.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/salaries', {
        name: employee.name,
        position: employee.position,
        bank: employee.bank,
        account: employee.account,
        nic: employee.nic,
        salary: salary,
      });
      console.log('Response:', response.data); // Logging the response data
      showAlert('Salary added successfully!');
      setSalary(''); // Clear the salary input after successful submission
    } catch (error) {
      console.error('Error adding salary:', error.response.data); // Log the detailed error message from backend
      showAlert('Error adding salary. Please try again.');
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  return (
    <div>
      <h1>Add Salary</h1>
      <form onSubmit={handleSubmit}>
        {/* Name input field */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={employee.name}
          readOnly
        />
        {/* NIC input field */}
        <label htmlFor="nic">NIC:</label>
        <input
          type="text"
          id="nic"
          name="nic"
          value={employee.nic}
          readOnly
        />
        {/* Position input field */}
        <label htmlFor="position">Position:</label>
        <input
          type="text"
          id="position"
          name="position"
          value={employee.position}
          readOnly
        />
        {/* Bank input field */}
        <label htmlFor="bank">Bank:</label>
        <input
          type="text"
          id="bank"
          name="bank"
          value={employee.bank}
          readOnly
        />
        {/* Account input field */}
        <label htmlFor="account">Account:</label>
        <input
          type="text"
          id="account"
          name="account"
          value={employee.account}
          readOnly
        />
        {/* Salary input field */}
        <label htmlFor="salary">Salary:</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={salary}
          onChange={handleSalaryChange}
          required
        />
        {/* Error message */}
        {error && <div className="error-message">{error}</div>}
        {/* Submit button */}
        <button type="submit">Add Salary</button>
      </form>
    </div>
  );
};

export default AddSalary;
