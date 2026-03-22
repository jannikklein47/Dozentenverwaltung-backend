const express = require("express");
const appRouter = express.Router();
const lectureRoutes = require("./lecture/lecture.routes");
const professorRoutes = require("./professor/professor.routes");
const registerRoutes = require("./register/register.routes");

appRouter.use("/professors", professorRoutes);
appRouter.use("/lectures", lectureRoutes);
appRouter.use("/register", registerRoutes);

module.exports = appRouter;
