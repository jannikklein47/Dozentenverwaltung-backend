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
 *       401:
 *         description: Zugangsdaten sind falsch
 *       403:
 *         description: Benutzer ist deaktiviert
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
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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
 * /auth/logout:all:
 *   post:
 *     summary: Benutzer abmelden
 *     tags: [Auth]
 *     security:
 *       - jwtToken: []
 *     parameters:
 *       - in: query
 *         name: all
 *         schema:
 *           type: boolean
 *         description: Wenn true, werden alle Refresh-Tokens des Benutzers auf allen Geräten gelöscht.
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
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 description: Das aktuelle Refresh-Token, das invalidiert werden soll.
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
 *       400:
 *         description: Validierungsfehler
 *       401:
 *         description: Unauthorized (Token fehlt oder ungültig)
 *       500:
 *         description: Interner Serverfehler
 */
router.post(
  "/logout:all",
  verifyToken,
  ratelimiter.generalLimiter,
  authValidate.validateLogout,
  authController.logout,
);

module.exports = router;
