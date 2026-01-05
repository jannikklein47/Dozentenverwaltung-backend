const express = require("express");

const v1Router = express.Router();

const rWelcome = require("./welcome");
const appRouter = require("./app/appRouter");

// Unprotected route
v1Router.use("/", rWelcome);

// Protected routes
v1Router.use("/app", /*verifyToken(),*/ appRouter);

module.exports = v1Router;
