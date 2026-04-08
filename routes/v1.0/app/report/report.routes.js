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

/**
 * @swagger
 * /app/reports/lectures/without-provadis-experience:
 *   get:
 *     summary: Get all lectures without Provadis experience
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
 *                   example: 40
 *                 lectures:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 6
 *                       name:
 *                         type: string
 *                         example: "Englisch für IT I"
 *                       vorlesung_statusId:
 *                         type: integer
 *                         example: 2
 *                       abschluss_typId:
 *                         type: integer
 *                         example: 1
 *                       semester:
 *                         type: integer
 *                         example: 1
 *                       kuerzel:
 *                         type: string
 *                         example: "ENG1"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-03-27T11:55:26.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-03-27T11:55:26.000Z"
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
  "/lectures/without-provadis-experience",
  reportController.getLecturewithoutProvadisExperience,
);

/**
 * @swagger
 * /app/reports/professors/with-provadis-lectures:
 *   get:
 *     summary: Get all professors with their Provadis lectures
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
 *         description: A list of professors and their given Provadis lectures
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 19
 *                 professors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       titel:
 *                         type: string
 *                         example: "Prof. Dr."
 *                       vorname:
 *                         type: string
 *                         example: "Thomas"
 *                       name:
 *                         type: string
 *                         example: "Müller"
 *                       email:
 *                         type: string
 *                         example: "t.mueller@fh.de"
 *                       telefonnummer:
 *                         type: string
 *                         example: "0123-100"
 *                       lectures:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             name:
 *                               type: string
 *                               example: "Einführung in die Informatik"
 *                             kuerzel:
 *                               type: string
 *                               example: "EIDI"
 *                             completionType:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                   example: "Bachelor"
 *                             lectureStatus:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                   example: "Offen"
 *                             Vorlesung_Dozent:
 *                               type: object
 *                               properties:
 *                                 vorlaufzeit:
 *                                   type: string
 *                                   example: "4"
 *                       professorStatus:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Intern"
 *                       preference:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Alles"
 *       500:
 *         description: Server error
 */

router.get(
  "/professors/with-provadis-lectures",
  reportController.getProfessorWithProvadisLectures,
);

module.exports = router;
