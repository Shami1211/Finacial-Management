const Salary = require('../Model/SalaryModel');

const getAllSalaries = async (req, res, next) => {
  try {
    const salaries = await Salary.find();
    res.status(200).json({ success: true, data: salaries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const addSalary = async (req, res, next) => {
  try {
    const newSalary = new Salary(req.body);
    await newSalary.save();
    res.status(201).json({ success: true, data: newSalary });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: 'Invalid data' });
  }
};

const getSalaryById = async (req, res, next) => {
  try {
    const salary = await Salary.findById(req.params.id);
    if (!salary) {
      return res.status(404).json({ success: false, message: 'Salary not found' });
    }
    res.status(200).json({ success: true, data: salary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const updateSalary = async (req, res, next) => {
  try {
    const updatedSalary = await Salary.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedSalary) {
      return res.status(404).json({ success: false, message: 'Salary not found' });
    }
    res.status(200).json({ success: true, data: updatedSalary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const deleteSalary = async (req, res, next) => {
  try {
    const deletedSalary = await Salary.findByIdAndDelete(req.params.id);
    if (!deletedSalary) {
      return res.status(404).json({ success: false, message: 'Salary not found' });
    }
    res.status(200).json({ success: true, data: deletedSalary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllSalaries,
  addSalary,
  getSalaryById,
  updateSalary,
  deleteSalary,
};
