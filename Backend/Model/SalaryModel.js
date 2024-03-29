const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SalarySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  salary: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Salary', SalarySchema);
