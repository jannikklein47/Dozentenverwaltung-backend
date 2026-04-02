const express = require("express");
const router = express.Router();
const reportController = require("./report.controller");

/**
 * @swagger
 * /app/reports/lectures/without-professor:
 *   get:
 *     summary: Get all lectures without professors
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of results
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Offset for pagination
 *     responses:
 *       200:
 *         description: A list of lectures
 *       500:
 *         description: Server error
 */

router.get(
  "/lectures/without-professor",
  reportController.getLecturewithoutProfessor,
);

module.exports = router;
