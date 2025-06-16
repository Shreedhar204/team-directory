const express = require("express");
const app = express();
const PORT = 8081;
const db = require("./db");
const { Department } = require("./models/models");
const Employees = require("./models/employeeModel");
const { Op } = require("sequelize");

app.use(express.json());

Employees.belongsTo(Department, { foreignKey: "departmentId" });
Department.hasMany(Employees, { foreignKey: "departmentId" });

app.get("/", (req, res) => {
  res.send("hello there");
});

app.get("/departments", async (req, res) => {
  try {
    const departments = await Department.findAll({
      attributes: ["id", "name"],
    });
    res.json({ departments });
  } catch (error) {
    console.log("failed to fetch: ", error);
  }
});

app.get("/employees", async (req, res) => {
  try {
    const employees = await Employees.findAll({
      attributes: ["id", "managerId", "name", "title", "departmentId"],
    });
    res.json({ employees });
  } catch (error) {
    console.log("failed to fetch: ", error);
  }
});

app.post("/department", async (req, res) => {
  try {
    const { name } = req.body;
    const department = await Department.create({ name });
    res.status(201).json(department);
  } catch (error) {
    console.log("failed to add department: ", error);
    res.status(500).json({ message: "Failed to add department" });
  }
});
app.post("/employee", async (req, res) => {
  try {
    const { name, managerId, title, departmentId } = req.body;
    const employee = await Employees.create({
      name,
      managerId,
      title,
      departmentId,
    });
    res.status(201).json(employee);
  } catch (error) {
    console.log("failed to add employee: ", error);
    res.status(500).json({ message: "Failed to add employee" });
  }
});
app.get("/employee/search", async (req, res) => {
  try {
    const { name, title, department } = req.query;
    const employees = await Employees.findAll({
      where: { name: { [Op.like]: `%${name}%` }, title: title },
      include: [
        {
          model: Department,
          where: { name: department },
        },
      ],
    });
    res.json(employees);
  } catch (error) {
    console.log("failed to find employee: ", error);
  }
});

const initApp = async () => {
  console.log("Testing db connection");
  try {
    await db.authenticate();
    console.log("Db connection successful");

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

initApp();
