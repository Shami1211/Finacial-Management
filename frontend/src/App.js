import React from "react";
import { Route, Routes } from "react-router";

import AddEmployee from "./Components/Employees-Salary/Add-Employee/AddEmployee";
import EmployeeDetails from "./Components/Employees-Salary/Employee/EmployeeDetails";
import EmployeeValidate from "./Components/Employees-Salary/Add-Employee/Validate";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          

          {/*Emplyees*/}
          <Route path="/" element={<AddEmployee />} />
          <Route path="/employeedetails" element={<EmployeeDetails />} />
          <Route path="/employeevalidates" element={<EmployeeValidate />} />
  
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
