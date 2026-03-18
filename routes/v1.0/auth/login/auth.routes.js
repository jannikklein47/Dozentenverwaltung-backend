const express = require("express");
const router = express.Router();

const authValidate = require("./auth.validate");
const authController = require("./auth.controller");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Benutzer anmelden
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 format: password
 *                 example: geheim123
 *     responses:
 *       200:
 *         description: Login erfolgreich, JWT wurde als HttpOnly-Cookie gesetzt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *       401:
 *         description: Zugangsdaten sind falsch
 *       403:
 *         description: Benutzer ist deaktiviert
 *       500:
 *         description: Interner Serverfehler
 */

router.post("/", authValidate.validateLogin, authController.login);

module.exports = router;
