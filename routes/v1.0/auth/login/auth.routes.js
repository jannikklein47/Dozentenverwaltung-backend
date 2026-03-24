const express = require("express");
const router = express.Router();

const authValidate = require("./auth.validate");
const authController = require("./auth.controller");
const verifyToken = require("../verifytoken").verifyToken;

const ratelimiter = require("../../ratelimiter");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Benutzer anmelden
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
 *                 example: admin
 *               password:
 *                 type: string
 *                 format: password
 *                 example: geheim123
 *     responses:
 *       200:
 *         description: Login erfolgreich
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 initialPassword:
 *                   type: boolean
 *                   description: Kennzeichnet, ob der Benutzer noch sein initiales Passwort verwendet
 *                   example: false
 *                 accessToken:
 *                   type: string
 *                   description: JWT Access Token
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh Token
 *                 refreshTokenExp:
 *                   type: string
 *                   format: date-time
 *                   description: Ablaufdatum des Refresh Tokens
 *                   example: 2026-03-27T10:15:30.000Z
 *       401:
 *         description: Zugangsdaten sind falsch
 *       403:
 *         description: Benutzer ist deaktiviert
 *       429:
 *         description: Zu viele Anfragen
 *       500:
 *         description: Interner Serverfehler
 */
router.post(
  "/login",
  ratelimiter.loginLimiter,
  authValidate.validateLogin,
  authController.login,
);

/**
 * @swagger
 * /auth/refreshtoken:
 *   post:
 *     summary: Refresh JWT Token
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "6f1d2c58e6d1a1d4f7a0b35b8c2f9e1a3d4b5c6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f60718293a4b5c6d7e8"
 *     responses:
 *       200:
 *         description: Refresh Token erfolgreich
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Refresh Token successfull
 *                 initialPassword:
 *                   type: boolean
 *                   description: Kennzeichnet, ob der Benutzer noch sein initiales Passwort verwendet
 *                   example: false
 *                 accessToken:
 *                   type: string
 *                   description: Neues JWT Access Token
 *                 refreshToken:
 *                   type: string
 *                   description: Neues Refresh Token
 *                 refreshTokenExp:
 *                   type: string
 *                   format: date-time
 *                   description: Ablaufdatum des neuen Refresh Tokens
 *       400:
 *         description: Validierungsfehler (Token fehlt oder ist ungültig)
 *       401:
 *         description: Unauthorized (Token abgelaufen oder Benutzer existiert nicht)
 *       403:
 *         description: Benutzer ist deaktiviert
 *       500:
 *         description: Interner Serverfehler
 */
router.post(
  "/refreshtoken",
  ratelimiter.refreshTokenLimiter,
  authValidate.validateRefreshToken,
  authController.refreshToken,
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Benutzer abmelden
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: all
 *         required: false
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Wenn `true`, werden alle Refresh-Tokens des Benutzers geloescht.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 minLength: 128
 *                 maxLength: 128
 *                 description: SHA-256-kompatibler Hex-Token-String.
 *                 example: "6f1d2c58e6d1a1d4f7a0b35b8c2f9e1a3d4b5c6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f60718293a4b5c6d7e8"
 *     responses:
 *       200:
 *         description: Logout erfolgreich
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 *       401:
 *         description: Unauthorized (Access Token ungueltig oder abgelaufen)
 *       429:
 *         description: Zu viele Anfragen
 *       500:
 *         description: Interner Serverfehler
 */
router.post(
  "/logout",
  verifyToken,
  ratelimiter.generalLimiter,
  authValidate.validateLogout,
  authController.logout,
);

/**
 * @swagger
 * /auth/changeinitialpassword:
 *   post:
 *     summary: Initiales Passwort ändern
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *               - refreshToken
 *             properties:
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 128
 *                 description: Neues Passwort für den Benutzer
 *                 example: "myNewPassword123"
 *               refreshToken:
 *                 type: string
 *                 minLength: 128
 *                 maxLength: 128
 *                 description: SHA-256-kompatibler Hex-Token-String zur Authentifizierung des Passwort-Wechsels
 *                 example: "6f1d2c58e6d1a1d4f7a0b35b8c2f9e1a3d4b5c6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f60718293a4b5c6d7e8"
 *     responses:
 *       200:
 *         description: Passwort erfolgreich geändert
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password changed successfully
 *                 accessToken:
 *                   type: string
 *                   description: Neues JWT Access Token
 *                 refreshToken:
 *                   type: string
 *                   description: Neues Refresh Token
 *                 refreshTokenExp:
 *                   type: string
 *                   format: date-time
 *                   description: Ablaufdatum des neuen Refresh Tokens
 *       400:
 *         description: Validierungsfehler oder initiales Passwort wurde bereits geändert
 *       401:
 *         description: Unauthorized (Token ungültig, abgelaufen oder User nicht gefunden)
 *       429:
 *         description: Zu viele Anfragen
 *       500:
 *         description: Interner Serverfehler
 */
router.post(
  "/changeinitialpassword",
  verifyToken,
  ratelimiter.generalLimiter,
  authValidate.validateChangeInitialPassword,
  authController.changeInitialPassword,
);

module.exports = router;
