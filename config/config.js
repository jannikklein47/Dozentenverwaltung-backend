require("dotenv").config();
const Logger = require("../utils/logger");

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "dozentenverwaltung_db",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: (msg) => Logger.db(msg),
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "dozentenverwaltung_db",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: (msg) => Logger.db(msg),
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "dozentenverwaltung_db",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: (msg) => Logger.db(msg),
  },
};
