const Employee = require("../models/Employee");

// GET ALL EMPLOYEES
const getEmployees = async (req, res) => {
  try {
    let employees;

    // Admin ko sab employees dikhao
    if (
      req.user.role &&
      req.user.role.toString().trim().toLowerCase() === "admin"
    ) {
      employees = await Employee.find();
    } else {
      // Normal employee ko sirf apna data
      employees = await Employee.find({
        $or: [
          { user: req.user.id },
          { user: { $exists: false } }
        ]
      });
    }

    res.json(employees);
  } catch (error) {
    console.error("EMPLOYEE ERROR 👉", error);
    res.status(500).json({ message: error.message });
  }
};

// CREATE EMPLOYEE
const createEmployee = async (req, res) => {
  try {
    const employee = new Employee({
      ...req.body,
      user: req.user.id
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error("EMPLOYEE ERROR 👉", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error("EMPLOYEE ERROR 👉", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (error) {
    console.error("EMPLOYEE ERROR 👉", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
};