const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("team_directory", "root", "nosecret", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
