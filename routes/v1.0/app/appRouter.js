const express = require("express");
const appRouter = express.Router();
const lectureRoutes = require("./lecture/lecture.routes");
const professorRoutes = require("./professor/professor.routes");
const reportRoutes = require("./report/report.routes");
const usersRoutes = require("./user/user.routes");
const singleUserRoutes = require("./singleUser/singleUser.routes");

appRouter.use("/professors", professorRoutes);
appRouter.use("/lectures", lectureRoutes);
appRouter.use("/reports", reportRoutes);
appRouter.use("/users", usersRoutes);
appRouter.use("/user", singleUserRoutes);

module.exports = appRouter;
