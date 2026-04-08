const express = require("express");
const appRouter = express.Router();
const lectureRoutes = require("./lecture/lecture.routes");
const professorRoutes = require("./professor/professor.routes");
const reportRoutes = require("./report/report.routes");
const userRoutes = require("./user/user.routes");

appRouter.use("/professors", professorRoutes);
appRouter.use("/lectures", lectureRoutes);
appRouter.use("/reports", reportRoutes);
appRouter.use("/users", userRoutes);

module.exports = appRouter;
