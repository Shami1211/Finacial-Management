const express = require("express");
const employee_router = express.Router();
const EmployeeController = require("../Controllers/EmployeeController");

employee_router.get("/", EmployeeController.getAllEmployees);
employee_router.post("/", EmployeeController.addEmployee);
employee_router.get("/:id", EmployeeController.getEmployeeById);
employee_router.put("/:id", EmployeeController.updateEmployee);
employee_router.delete("/:id", EmployeeController.deleteEmployee);

module.exports = employee_router;
