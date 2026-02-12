const express = require("express");
const appRouter = express.Router();
const lectureRoutes = require("./lecture/lecture.routes");

appRouter.use("/lectures", lectureRoutes);

module.exports = appRouter;
