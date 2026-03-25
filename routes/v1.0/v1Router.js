const express = require("express");

const v1Router = express.Router();

const verifyToken = require("./auth/verifytoken").verifyToken;
const verifyRole = require("./auth/rolecontrol").verifyRole;
const { generalLimiter } = require("./ratelimiter");
const rWelcome = require("./welcome");
const appRouter = require("./app/appRouter");
const authRouter = require("./auth/authRouter");

// Unprotected route
v1Router.use("/", rWelcome);

v1Router.use("/auth", authRouter);

// Protected routes
v1Router.use(
  "/app",
  verifyToken,
  verifyRole(["User", "Admin"]),
  generalLimiter,
  appRouter,
);

module.exports = v1Router;
