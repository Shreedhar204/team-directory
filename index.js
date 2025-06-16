const express = require("express");
const app = express();
const PORT = 8081;
const db = require("./db");
const Departments = require("./models/departmentModel");
const Employees = require("./models/employeeModel");
const { Op, QueryTypes } = require("sequelize");
const sequelize = require("./db");

app.use(express.json());

Employees.belongsTo(Departments, { foreignKey: "departmentId" });
Departments.hasMany(Employees, { foreignKey: "departmentId" });

app.get("/", (req, res) => {
  res.send("hello there");
});

app.get("/departments", async (req, res) => {
  try {
    const departments = await Departments.findAll({
      attributes: ["id", "name"],
    });
    res.json({ departments });
  } catch (error) {
    console.log("failed to fetch: ", error);
    res.status(500).json({ message: "Failed to fetch departments" });
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
    res.status(500).json({ message: "Failed to fetch employees" });
  }
});

app.post("/department", async (req, res) => {
  try {
    const { name } = req.body;
    const department = await Departments.create({ name });
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
          model: Departments,
          where: { name: department },
        },
      ],
    });
    res.json(employees);
  } catch (error) {
    console.log("failed to find employee: ", error);
    res.status(500).json({ message: "Failed to find employee" });
  }
});

app.get("/employees/heirarchy/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employeeHeirarchy = await sequelize.query(
      `
      WITH RECURSIVE cte AS (
        SELECT id, name, title, managerId, 1 AS level
        FROM Employees
        WHERE managerId = :employeeId

        UNION

        SELECT a.id, a.name, a.title, a.managerId, b.level + 1
        FROM Employees a
        INNER JOIN cte b ON a.managerId = b.id
      )
      SELECT 
        a.name AS manager,
        b.name, b.title, b.level
      FROM Employees a
      INNER JOIN cte b ON a.id = :employeeId;
      `,
      {
        replacements: { employeeId },
        type: QueryTypes.SELECT,
      }
    );
    const managerName = employeeHeirarchy[0].manager;
    const team = employeeHeirarchy.map(({ name, title, level }) => ({
      name,
      title,
      level,
    }));
    res.json({ manager: managerName, team });
  } catch (error) {
    console.log("failed to find employee: ", error);
    res.status(500).json({ message: "Failed to fetch hierarchy" });
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
