const express = require("express");
const appRouter = express.Router();
const lectureRoutes = require("./lecture/lecture.routes");
const professorRoutes = require("./professor/professor.routes");
const reportRoutes = require("./report/report.routes");

appRouter.use("/professors", professorRoutes);
appRouter.use("/lectures", lectureRoutes);
appRouter.use("/reports", reportRoutes);

module.exports = appRouter;
