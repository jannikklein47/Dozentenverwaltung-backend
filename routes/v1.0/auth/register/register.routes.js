const express = require("express");
const router = express.Router();
const registerController = require("./register.controller");
const validate = require("./register.validate");
/**
 * @swagger
 * /app/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@mail.com"
 *               password:
 *                 type: string
 *                 example: "Test123!"
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", validate.validateRegisterBody, registerController.register);
module.exports = router;
