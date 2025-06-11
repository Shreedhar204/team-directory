const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("team_directory", "root", "notsecret", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
