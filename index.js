const express = require("express");
const app = express();
const PORT = 8081;
const db = require("./db");
const {
  getAllDepartments,
  getAllEmployees,
  addDepartment,
} = require("./controller");
const { Department } = require("./models/models");
// import { Department } from "./models";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello there");
});

app.get("/departments", async (req, res) => {
  const departments = await getAllDepartments();
  const plainDepartments = departments.map((dept) => dept.toJSON());
  console.log({ plainDepartments });
  res.json(
    { test: departments }
    // Department.findAll()
    //   .then((result) => {
    //     return json(result);
    //   })
    //   .catch((error) => {
    //     return { message: "Unable to fetch" };
    //   })
  );
});

app.get("/employees", async (req, res) => {
  const employees = await getAllEmployees();
  res.json({ employees });
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
