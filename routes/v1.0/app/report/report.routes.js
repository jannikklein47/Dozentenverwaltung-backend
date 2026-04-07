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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 1
 *                 lectures:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Grundlagen der Informatik"
 *                       semester:
 *                         type: integer
 *                         example: 1
 *                       completionType:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Bachelor"
 *                       lectureStatus:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Offen"
 *       500:
 *         description: Server error
 */

router.get(
  "/lectures/without-professor",
  reportController.getLecturewithoutProfessor,
);

module.exports = router;
