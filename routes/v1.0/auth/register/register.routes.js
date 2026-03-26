const express = require("express");
const router = express.Router();
const registerController = require("./register.controller");
const validate = require("./register.validate");
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registriert einen neuen Benutzer
 *     description: Erstellt ein neues Benutzerkonto mit Benutzername und Passwort.
 *     tags: [Auth]
 *     security: []
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
 *                 format: email
 *                 description: E-Mail-Adresse des neuen Benutzers (wird als Login verwendet).
 *                 example: test@mail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: Passwort des neuen Benutzers.
 *                 example: "Test123!"
 *     responses:
 *       201:
 *         description: Benutzer erfolgreich erstellt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created
 *       400:
 *         description: Validierungsfehler (z. B. fehlende oder ungueltige Felder)
 *       409:
 *         description: Benutzername ist bereits vergeben
 *       500:
 *         description: Interner Serverfehler
 */
router.post("/", validate.validateRegisterBody, registerController.register);
module.exports = router;
