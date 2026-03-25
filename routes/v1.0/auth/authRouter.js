const express = require("express");
const authRouter = express.Router();
const loginRoutes = require("./login/auth.routes");
const registerRoutes = require("./register/register.routes");

authRouter.use("/", loginRoutes);

appRouter.use("/register", registerRoutes);

module.exports = authRouter;
