const express = require("express");
const router = express.Router();
const lectureController = require("./lecture.controller"); // Nicht vergessen zu importieren!

/**
 * @swagger
 * /lectures:
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
 *       - in: query
 *         name:
 *     responses:
 *       200:
 *         description: A list of lectures
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
    checkauth,
    lectureController.getAllLectures
);

module.exports = router;