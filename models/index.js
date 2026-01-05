"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};
const Logger = require("../utils/logger");

let sequelize;
try {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  }
  Logger.info(
    `Connection to ${config.database} has been established successfully.`
  );
} catch (error) {
  Logger.error(`Unable to connect to ${config.database} : ${error}`);
}

try {
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        file.indexOf(".test.js") === -1
      );
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    try {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    } catch (error) {
      Logger.error(
        `Unable to make Associations for ${modelName} model : ${error}`
      );
    }
  });
  Logger.info("Loaded models");
} catch (error) {
  Logger.error(`Unable to load models : ${error}`);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
