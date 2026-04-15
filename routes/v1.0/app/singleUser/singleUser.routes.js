const express = require("express");
const router = express.Router();
const singleUserController = require("./singleUser.controller");
const validate = require("./singleUser.validate");

/**
 * @swagger
 * /app/user:
 *   get:
 *     tags:
 *       - Single User
 *     name: Get single user
 *     summary: Get authenticated user
 *     description: Returns the authenticated user's public profile data based on the JWT token.
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "prof@provadis.de"
 *                 role:
 *                   type: string
 *                   example: "Admin"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-03-27T11:55:26.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-03-27T11:55:26.000Z"
 *             example:
 *               id: 1
 *               username: "prof@provadis.de"
 *               role: "Admin"
 *               createdAt: "2026-03-27T11:55:26.000Z"
 *               updatedAt: "2026-03-27T11:55:26.000Z"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

router.get("/", singleUserController.getSingleUser);

/**
 * @swagger
 * /app/user/change-username:
 *   patch:
 *     tags:
 *       - Single User
 *     name: Change username
 *     summary: Change username for authenticated user
 *     description: Updates the username for the authenticated user based on the JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 format: email
 *                 example: "User@provadis.de"
 *     responses:
 *       200:
 *         description: Username updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Username updated successfully"
 *                 username:
 *                   type: string
 *                   example: "User@provadis.de"
 *             example:
 *               message: "Username updated successfully"
 *               username: "User@provadis.de"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.patch(
  "/change-username",
  validate.validateUsernameBody,
  singleUserController.changeUsername,
);

/**
 * @swagger
 * /app/user/change-password:
 *   patch:
 *     tags:
 *       - Single User
 *     name: Change password
 *     summary: Change password for authenticated user
 *     description: Updates the password for the authenticated user based on the JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldpassword
 *               - password
 *             properties:
 *               oldpassword:
 *                 type: string
 *                 format: password
 *                 example: "OldPassword123!"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "NewPassword123!"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password updated successfully"
 *             example:
 *               message: "Password updated successfully"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.patch(
  "/change-password",
  validate.validatePasswordBody,
  singleUserController.changePassword,
);

module.exports = router;
