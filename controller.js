const { Department } = require("./models/models");
const Employees = require("./models/employeeModel");
const { Response, Request } = require("express");
const sequelize = require("./db");

const getAllDepartments = async () => {
  try {
    const departments = await Department.findAll({
      attributes: ["id", "name"],
    });
    // console.log({ departments });
    return departments;
  } catch (error) {
    console.log("failed to fetch: ", error);
  }

  // .then((result) => {
  //   return res.json(result);
  // })
  // .catch((error) => {
  //   res.json({ message: "Unable to fetch" });
  // });
};

const getAllEmployees = async () => {
  try {
    const employees = await Employees.findAll({
      attributes: ["id", "managerId", "name", "title", "departmentId"],
    });
    return employees;
  } catch (error) {
    console.log("failed to fetch: ", error);
  }
};

const addDepartment = async () => {
  try {
    const { name } = req.body;
    const department = await sDepartment.create(name);
    return department;
  } catch (error) {
    console.log("failed to insert: ", error);
  }
};

module.exports = { getAllDepartments, getAllEmployees, addDepartment };
