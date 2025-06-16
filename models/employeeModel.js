const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Employees = sequelize.define(
  "Employees",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    managerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Empoyees",
        key: "id",
      },
      allowNull: true,
      defaultValue: null,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    departmentId: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false }
);

console.log(Employees === sequelize.models.Employees);
module.exports = Employees;
