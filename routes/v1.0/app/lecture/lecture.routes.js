const express = require("express");
const router = express.Router();
const lectureController = require("./lecture.controller");
const validate = require("./lecture.validate");

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
 *         description: List of lectures
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
 *                             id:
 *                               type: integer
 *                               example: 1
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
router.get(
  "/",
  // checkauth,
  validate.validateLectureQuery,
  lectureController.getAllLectures,
);

/**
 * @swagger
 * /app/lectures/professor/{id}:
 *   get:
 *     summary: Get all lectures that are held by a professor
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the professor
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
 *         description: List of lectures for a professor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 5
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
 *                         example: "Einführung in die Informatik"
 *                       kuerzel:
 *                         type: string
 *                         example: "EIDI"
 *                       semester:
 *                         type: integer
 *                         example: 1
 *                       professors:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
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
router.get(
  "/professor/:id",
  // checkauth,
  validate.validateLectureQuery,
  validate.validateProfessorId,
  lectureController.getLecturesOfProfessor,
);

/**
 * @swagger
 * /app/lectures/mapping:
 *   get:
 *     summary: Get the name of Abschluss_Typ and Vorlesung_Status for each Id
 *     tags: [Lectures]
 *     responses:
 *       200:
 *         description: A list of mappings
 *         content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               completionTyp:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Bachelor"
 *               lectureStatus:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Geschlossen"
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */

router.get(
  "/mapping",
  // checkauth,
  lectureController.getLectureMappings,
);

/**
 * @swagger
 * /app/lectures:
 *   post:
 *     summary: Create a new lecture
 *     tags: [Lectures]
 *     parameters:
 *       - in: body
 *         name: lecture
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Mathematik I"
 *             kuerzel:
 *               type: string
 *               example: "Math1"
 *             semester:
 *               type: integer
 *               example: 1
 *             abschluss_typId:
 *               type: integer
 *               example: 1
 *             vorlesung_statusId:
 *               type: integer
 *               example: 1
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 29
 *                 name:
 *                   type: string
 *                   example: "Mathematik I"
 *                 kuerzel:
 *                   type: string
 *                   example: "Math1"
 *                 vorlesung_statusId:
 *                   type: integer
 *                   example: 1
 *                 abschluss_typId:
 *                   type: integer
 *                   example: 1
 *                 semester:
 *                   type: integer
 *                   example: 1
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-02-14T14:59:09.319Z"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-02-14T14:59:09.319Z"
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/",
  // checkauth,
  validate.validateLectureBody,
  lectureController.postLecture,
);

module.exports = router;
