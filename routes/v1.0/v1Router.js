const express = require("express");

const v1Router = express.Router();

const verifyToken = require("./auth/verifytoken").verifyToken;

const rWelcome = require("./welcome");
const appRouter = require("./app/appRouter");
const authRouter = require("./auth/authRouter");

// Unprotected route
v1Router.use("/", rWelcome);

v1Router.use("/auth", authRouter);

// Protected routes
v1Router.use("/app", verifyToken, appRouter);

module.exports = v1Router;
