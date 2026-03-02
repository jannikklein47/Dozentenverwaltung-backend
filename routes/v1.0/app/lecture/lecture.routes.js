const express = require("express");
const router = express.Router();
const lectureController = require("./lecture.controller");
const validate = require("./lecture.validate");

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
 *   get:
 *     summary: Get all lectures with their associated lecturers
 *     tags: [Lectures]
 *     parameters:
 *       - in: query
 *         name: term
 *         schema:
 *           type: string
 *         description: A search term
 *       - in: query
 *         name: vorlesung_statusId
 *         schema:
 *           type: integer
 *         description: The id of the Vorlesung_Status
 *       - in: query
 *         name: abschluss_typId
 *         schema:
 *           type: integer
 *         description: The id of the Abschluss_Typ
 *       - in: query
 *         name: gehalten_anId
 *         schema:
 *           type: integer
 *         description: The id of the Gehalten_An
 *       - in: query
 *         name: semester
 *         schema:
 *           type: integer
 *         description: The number of the Semester
 *       - in: query
 *         name: vorlaufzeit
 *         schema:
 *           type: string
 *         description: The time a professor needs before he can lecture something; S, 4 or M
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
 *                             Vorlesung_Dozent:
 *                               type: object
 *                               properties:
 *                                 vorlaufzeit:
 *                                   type: string
 *                                   example: "M"
 *                                 gehalten_anId:
 *                                   type: integer
 *                                   example: 1
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
  validate.validateProfessorLectureFilter,
  lectureController.getAllLectures,
);

/**
 * @swagger
 * /app/lectures/{id}:
 *   get:
 *     summary: Get a lecture by id
 *     tags: [Lectures]
 *     responses:
 *       200:
 *         description: lecture
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lecture:
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
 *                             Vorlesung_Dozent:
 *                               type: object
 *                               properties:
 *                                 vorlaufzeit:
 *                                   type: string
 *                                   example: "M"
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
  "/:id",
  // checkauth,
  validate.validateLectureId,
  lectureController.getLectureById,
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
 *         name: term
 *         schema:
 *           type: string
 *         description: A search term
 *       - in: query
 *         name: vorlesung_statusId
 *         schema:
 *           type: integer
 *         description: The id of the Vorlesung_Status
 *       - in: query
 *         name: abschluss_typId
 *         schema:
 *           type: integer
 *         description: The id of the Abschluss_Typ
 *       - in: query
 *         name: vorliebeId
 *         schema:
 *           type: integer
 *         description: The id of the Vorliebe
 *       - in: query
 *         name: semester
 *         schema:
 *           type: integer
 *         description: The number of the Semester
 *       - in: query
 *         name: gehalten_anId
 *         schema:
 *           type: integer
 *         description: The id of Gehalten_An
 *       - in: query
 *         name: vorlaufzeit
 *         schema:
 *           type: string
 *         description: The time a professor needs before he can lecture something; S, 4 or M
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
 *                             Vorlesung_Dozent:
 *                               type: object
 *                               properties:
 *                                 vorliebeId:
 *                                   type: integer
 *                                   example: 1
 *                                 gehalten_anId:
 *                                   type: integer
 *                                   example: 1
 *                                 vorlaufzeit:
 *                                   type: string
 *                                   example: "M"
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
  validate.validateProfessorLectureFilter,
  lectureController.getLecturesOfProfessor,
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
