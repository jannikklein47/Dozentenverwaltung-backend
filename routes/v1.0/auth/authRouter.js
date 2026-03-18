const express = require("express");
const authRouter = express.Router();
const loginRoutes = require("./login/auth.routes");

authRouter.use("/login", loginRoutes);

module.exports = authRouter;
