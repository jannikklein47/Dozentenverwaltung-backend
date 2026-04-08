const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const validate = require("./user.validate");

/**
 * @swagger
 * /app/users:
 *   get:
 *     tags:
 *       - User
 *     name: Get all users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 1
 *                 users:
 *                   type: array
 *                   items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                          example: 1
 *                        username:
 *                          type: string
 *                          example: "admin"
 *                        role:
 *                          type: string
 *                          example: "Admin"
 *                        active:
 *                          type: boolean
 *                          example: true
 *                        createdAt:
 *                          type: string
 *                          example: "2020-01-01T00:00:00.000Z"
 *                        updatedAt:
 *                          type: string
 *                          example: "2020-01-01T00:00:00.000Z"
 *                        initialPassword:
 *                          type: boolean
 *                          example: true
 *       500:
 *         description: Internal Server Error
 */
router.get("/", userController.getUsers);

/**
 * @swagger
 * /app/users/activate/{id}:
 *   post:
 *     tags:
 *       - User
 *     name: Activate a user
 *     summary: Activate a user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User activated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: String
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/activate/:id",
  validate.validateUserParams,
  userController.activateUser,
);

/**
 * @swagger
 * /app/users/deactivate/{id}:
 *   post:
 *     tags:
 *       - User
 *     name: Deactivate a user
 *     summary: Deactivate a user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User deactivated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: String
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/deactivate/:id",
  validate.validateUserParams,
  userController.deactivateUser,
);

/**
 * @swagger
 * /app/users/{id}:
 *   delete:
 *     tags:
 *       - User
 *     name: Delete a user
 *     summary: Delete a user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: String
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", validate.validateUserParams, userController.deleteUser);

/**
 * @swagger
 * /app/users/{id}:
 *   patch:
 *     tags:
 *       - User
 *     name: Update a user
 *     summary: Update a user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               role:
 *                 type: string
 *                 example: "Admin"
 *     responses:
 *       200:
 *         description: User deactivated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: String
 *       500:
 *         description: Internal Server Error
 */
router.patch(
  "/:id",
  validate.validateUserParams,
  validate.validateUserBody,
  userController.updateUser,
);

/**
 * @swagger
 * /app/users/reset-password/{id}:
 *   post:
 *     tags:
 *       - User
 *     name: Reset a user's password
 *     summary: Reset a user's password by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 password:
 *                   type: string
 *                   example: password
 *       500:
 *         description: Internal Server Error
 */
router.post("/reset-password/:id", userController.resetUserPassword);

module.exports = router;
