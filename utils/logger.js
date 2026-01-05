const winston = require("winston");

const levels = {
  error: 0,
  import: 1,
  http: 2,
  info: 3,
  warn: 4,
  debug: 5,
  db: 6,
};

const level = () => {
  if (process.env.LOG_LEVEL) return process.env.LOG_LEVEL;
  else {
    const env = process.env.NODE_ENV || "development";
    const isDevelopment = env === "development";
    return isDevelopment ? "debug" : "info"; // you can change log levels here - e.g. switch debug to db to see SQL-generated Logs by Sequelize in dev
  }
};

const colors = {
  error: "red",
  import: "orange",
  http: "cyan",
  info: "green",
  warn: "yellow",
  debug: "white",
  db: "magenta",
};

winston.addColors(colors);

// // disabled log files because it complicates the Container process
// const fileFormat = winston.format.combine(
//   winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//   winston.format.printf(
//     (info) =>
//       `{time: "${info.timestamp}", level: "${info.level}", message: "${info.message}"},`
//   )
// )

const transports = [
  new winston.transports.Console({
    level: level(),
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.colorize({ all: true }),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
  }),
  // // disabled log files because it complicates the Container process
  // new winston.transports.File({
  //   filename: 'logs/error.log',
  //   level: 'error',
  //   format: fileFormat,
  //   json: true,
  //   maxsize: 5242880,
  //   maxFiles: 3
  // }),
  // new winston.transports.File({
  //   filename: 'logs/all.log',
  //   format: fileFormat,
  //   json: true,
  //   maxsize: 5242880,
  //   maxFiles: 3
  // })
];

const Logger = winston.createLogger({
  levels,
  transports,
});

module.exports = Logger;
