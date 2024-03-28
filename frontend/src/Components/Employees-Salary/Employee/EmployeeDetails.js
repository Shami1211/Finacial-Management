import React, { useState, useEffect } from "react";
import axios from "axios";

const URL = "http://localhost:8080/employees";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [setSearchQuery] = useState("");
  const [noResults] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    position: "",
    bank: "",
    account: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(URL);
      setEmployees(response.data.employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

 

  const handleUpdate = (id) => {
    const selectedEmployee = employees.find((employee) => employee._id === id);
    if (selectedEmployee) {
      setUpdateData({
        id: selectedEmployee._id,
        name: selectedEmployee.name,
        position: selectedEmployee.position,
        bank: selectedEmployee.bank,
        account: selectedEmployee.account,
      });
    }
  };

  const handleChange = (newValue, name) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${updateData.id}`, updateData);
      fetchEmployees();
      setUpdateData({
        id: "",
        name: "",
        position: "",
        bank: "",
        account: "",
      });
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedEmployees = employees.filter((employee) => employee._id !== id);
        setEmployees(updatedEmployees);
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };



  return (
    <div>
      <h1>Employee Details</h1>
      
      {noResults ? (
        <h2>No results found.</h2>
      ) : (
        employees.map((employee) => (
          <div key={employee._id}>
            <p>Name: {employee.name}</p>
            <p>NIC: {employee.nic}</p>
            <p>Position: {employee.position}</p>
            <p>Bank: {employee.bank}</p>
            <p>Account: {employee.account}</p>
            
            <button onClick={() => handleUpdate(employee._id)}>Update</button>
            <button onClick={() => handleDelete(employee._id)}>Delete</button>
            {updateData.id === employee._id && (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={updateData.name}
                  onChange={(e) => handleChange(e.target.value, "name")}
                  required
                />
                <input
                  type="text"
                  name="position"
                  value={updateData.position}
                  onChange={(e) => handleChange(e.target.value, "position")}
                  required
                />
                <input
                  type="text"
                  name="bank"
                  value={updateData.bank}
                  onChange={(e) => handleChange(e.target.value, "bank")}
                  required
                />
                <input
                  type="text"
                  name="account"
                  value={updateData.account}
                  onChange={(e) => handleChange(e.target.value, "account")}
                  required
                />
                <button type="submit">Save</button>
              </form>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeDetails;
