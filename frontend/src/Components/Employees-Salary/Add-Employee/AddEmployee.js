import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function AddEmployee() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    position: "",
    bank: "",
    account: "",
    nic: "", // Adding the "nic" input field to state
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.name || !inputs.position || !inputs.bank || !inputs.account || !inputs.nic) {
      alert("Please provide all required information.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/employees", inputs);
      showAlert("Employee added successfully!");
      navigate("/employeevalidates");
    } catch (error) {
      console.error("Error adding employee:", error);
      showAlert("Error adding employee. Please try again.");
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  const handleViewEmployees = () => {
    navigate("/employeevalidates");
  };

  return (
    <div>
      <div className="employee-form-box">
     
            <button onClick={()=> (window.location.href='/adminlogin')} className="admin-login-btn">Admin</button> {/* Admin button */}
         
        <h1 className="employee-form-topic">
          Add <span className="employee-form-us">Employee</span>
        </h1>
        <form onSubmit={handleSubmit} className="employee-form-full-box">
          <label className="employee-form-full-box-label">Name</label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            className="employee-form-full-box-input"
            required
          /><br/>
           <label className="employee-form-full-box-label">NIC</label>
          <input
            type="text"
            name="nic"
            value={inputs.nic}
            onChange={handleChange}
            className="employee-form-full-box-input"
            required
          />
          <br />
          <label className="employee-form-full-box-label">Position</label>
          <input
            type="text"
            name="position"
            value={inputs.position}
            onChange={handleChange}
            className="employee-form-full-box-input"
            required
          />
          <br />
          <label className="employee-form-full-box-label">Bank</label>
          <input
            type="text"
            name="bank"
            value={inputs.bank}
            onChange={handleChange}
            className="employee-form-full-box-input"
            required
          />
          <br />
          <label className="employee-form-full-box-label">Account</label>
          <input
            type="text"
            name="account"
            value={inputs.account}
            onChange={handleChange}
            className="employee-form-full-box-input"
            required
          />
          <br />
         
          <br />
          <button type="submit" className="employee-add-btn">
            Add Employee
          </button>
        </form>
        <button type="button" className="view-employees-btn" onClick={handleViewEmployees}>
          View My Details
        </button>
      </div>
    </div>
  );
}

export default AddEmployee;
