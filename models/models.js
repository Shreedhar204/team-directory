const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Department = sequelize.define(
  "Department",
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
console.log(Department === sequelize.models.Department);

module.exports = { Department };
