const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Departments = sequelize.define(
  "Departments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: false }
);
console.log(Departments === sequelize.models.Department);

module.exports = Departments;
