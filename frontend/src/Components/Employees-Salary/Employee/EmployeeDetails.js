// EmployeeDetails.js
import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

const URL = "http://localhost:8080/employees";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
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

  const handleAddSalary = (id) => {
    // Navigate to the "Add Salary" page with employee ID and details
    navigate(`/addsalary/${id}`, { state: { employee: updateData } });
  };

  return (
    <div>
      <h1>Employee Details</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>NIC</th>
            <th>Position</th>
            <th>Bank</th>
            <th>Account</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.nic}</td>
              <td>{employee.position}</td>
              <td>{employee.bank}</td>
              <td>{employee.account}</td>
              <td>
              <Link to={`/addsalary/${employee.id}`} state={{ employee }}>Add Salary</Link>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetails;
