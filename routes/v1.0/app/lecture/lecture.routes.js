const express = require("express");
const router = express.Router();
const lectureController = require("./lecture.controller"); // Nicht vergessen zu importieren!

/**
 * @swagger
 * /app/lectures:
 *   get:
 *     summary: Get all lectures with their associated lecturers (short version)
 *     tags: [Lectures]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of lectures to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: The number of lectures to skip before starting to collect the result set
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
 *                       professors:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             vorname:
 *                               type: string
 *                               example: "Daniel"
 *                             name:
 *                               type: string
 *                               example: "Wolf"
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
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.get("/",
    // checkauth,
    lectureController.getAllLectures
);

module.exports = router;
