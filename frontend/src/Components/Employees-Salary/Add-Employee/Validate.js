import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Validate = () => {
  const [nic, setNic] = useState("");
  const [employees, setEmployees] = useState([]);
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    position: "",
    bank: "",
    account: "",
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to control visibility of update form
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNic(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/employees?nic=${nic}`
      );
      console.log("Response:", response.data);

      const relevantDetails = response.data.employees.filter(
        (employee) => employee.nic === nic
      );

      setEmployees(relevantDetails);

      if (relevantDetails.length === 0) {
        alert("No NIC found. Please enter a valid NIC.");
      }
    } catch (error) {
      console.error("Error fetching NIC:", error);
      alert("An error occurred while fetching employee details.");
    }
  };

  const handleUpdate = (id) => {
    const selectedEmployee = employees.find((employee) => employee.nic === nic);
    if (selectedEmployee) {
      setUpdateData({
        id: selectedEmployee._id,
        name: selectedEmployee.name,
        position: selectedEmployee.position,
        bank: selectedEmployee.bank,
        account: selectedEmployee.account,
      });
      setShowUpdateForm(true); // Show the update form when update button is clicked
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/employees/${updateData.id}`, updateData);
      // Alert with success message
      alert("Employee Details updated successfully.");
      // Navigate to another page
      navigate("/");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div>
      <h1>Validate Employee</h1>
      <form onSubmit={handleSubmit} className="rate_full_box_form">
        <label htmlFor="nic" className="rate_full_box_label">
          Enter Your NIC:
        </label>
        <br />
        <input
          className="rate_full_box_input"
          type="text"
          id="nic"
          name="nic"
          value={nic}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit" className="search_btn sen_btn">
          Check
        </button>
      </form>
      {employees.length > 0 ? (
        employees.map((employee, index) => (
          <div key={index}>
            <h2>NIC Details:</h2>
            <p>Name: {employee.name}</p>
            <p>NIC: {employee.nic}</p>
            <p>Position: {employee.position}</p>
            <p>Bank: {employee.bank}</p>
            <p>Account Number: {employee.account}</p>
            <button onClick={() => handleUpdate(employee.id)}>Update</button>
          </div>
        ))
      ) : (
        <p>No relevant employee details found.</p>
      )}
      {showUpdateForm && (
        <form onSubmit={handleSave}>
          <input
            type="text"
            name="name"
            value={updateData.name}
            onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
            required
          />
          <input
            type="text"
            name="position"
            value={updateData.position}
            onChange={(e) => setUpdateData({ ...updateData, position: e.target.value })}
            required
          />
          <input
            type="text"
            name="bank"
            value={updateData.bank}
            onChange={(e) => setUpdateData({ ...updateData, bank: e.target.value })}
            required
          />
          <input
            type="text"
            name="account"
            value={updateData.account}
            onChange={(e) => setUpdateData({ ...updateData, account: e.target.value })}
            required
          />
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default Validate;
