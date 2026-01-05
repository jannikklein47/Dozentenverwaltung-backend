const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Welcome
 *     name: Welcome Route
 *     summary: Welcomes User and tests the functionality of the api
 *     responses:
 *       200:
 *         description: API is working
 *       500:
 *         description: Server error
 */
router.get("/", function (req, res, next) {
  res.send("Hello v1.0 GET API from Dozentenverwaltung");
});

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Welcome
 *     name: Welcome Route
 *     summary: Welcomes User and tests the functionality of the api
 *     responses:
 *       200:
 *         description: API is working
 *       500:
 *         description: Server error
 */
router.post("/", function (req, res, next) {
  res.send("Hello v1.0 POST API from Dozentenverwaltung");
});

/**
 * @swagger
 * /:
 *   put:
 *     tags:
 *       - Welcome
 *     name: Welcome Route
 *     summary: Welcomes User and tests the functionality of the api
 *     responses:
 *       200:
 *         description: API is working
 *       500:
 *         description: Server error
 */
router.put("/", function (req, res, next) {
  res.send("Hello v1.0 PUT API from Dozentenverwaltung");
});

/**
 * @swagger
 * /:
 *   delete:
 *     tags:
 *       - Welcome
 *     name: Welcome Route
 *     summary: Welcomes User and tests the functionality of the api
 *     responses:
 *       200:
 *         description: API is working
 *       500:
 *         description: Server error
 */
router.delete("/", function (req, res, next) {
  res.send("Hello v1.0 DELETE API from Dozentenverwaltung");
});

module.exports = router;
