const express = require('express');
const router = express.Router();
const SalaryController = require('../Controllers/SalaryController');

router.get('/salaries', SalaryController.getAllSalaries);
router.post('/salaries', SalaryController.addSalary);
router.get('/salaries/:id', SalaryController.getSalaryById);
router.put('/salaries/:id', SalaryController.updateSalary);
router.delete('/salaries/:id', SalaryController.deleteSalary);

module.exports = router;
