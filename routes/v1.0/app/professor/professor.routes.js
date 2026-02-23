const express = require("express");
const router = express.Router();
const professorController = require("./professor.controller");
const validate = require("./professor.validate");

/**
 * @swagger
 * /app/professors:
 *   get:
 *     summary: Get all professors with their associated lecturers (short version)
 *     tags: [Professors]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of professors to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: The number of professors to skip before starting to collect the result set
 *     responses:
 *       200:
 *         description: A list of professors
 *         content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: integer
 *                 example: 1
 *               professors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     titel:
 *                       type: string
 *                       example: "Prof. Dr."
 *                     vorname:
 *                       type: string
 *                       example: "Thomas"
 *                     name:
 *                       type: string
 *                       example: "Mueller"
 *                     email:
 *                       type: string
 *                       example: "t.mueller@fh.de"
 *                     telefonnummer:
 *                       type: string
 *                       example: "0123-100"
 *                     lectures:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Einfuehrung in die Informatik"
 *                           kuerzel:
 *                             type: string
 *                             example: "EIDI"
 *                     professorStatus:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Intern"
 *                     preference:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "A"
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
  validate.validateProfessorQuery,
  professorController.getAllProfessors,
);

/**
 * @swagger
 * /app/professors/{id}:
 *   get:
 *     summary: Get a professor by his id
 *     tags: [Professors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the professor
 *     responses:
 *       200:
 *         description: A professor object
 *         content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               professor:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     titel:
 *                       type: string
 *                       example: "Prof. Dr."
 *                     vorname:
 *                       type: string
 *                       example: "Thomas"
 *                     name:
 *                       type: string
 *                       example: "Mueller"
 *                     email:
 *                       type: string
 *                       example: "t.mueller@fh.de"
 *                     telefonnummer:
 *                       type: string
 *                       example: "0123-100"
 *                     lectures:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Einfuehrung in die Informatik"
 *                           kuerzel:
 *                             type: string
 *                             example: "EIDI"
 *                     professorStatus:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Intern"
 *                     preference:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "A"
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
  validate.validateProfessorId,
  professorController.getProfessorById,
);

/**
 * @swagger
 * /app/professors/mapping:
 *   get:
 *     summary: Get the name of Dozenten_Status and Vorliebe for each Id
 *     tags: [Professors]
 *     responses:
 *       200:
 *         description: A list of mappings
 *         content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *               professor_status:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Intern"
 *               preference:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "M"
 *            example:
 *             professor_status:
 *               - id: 1
 *                 name: "Intern"
 *               - id: 2
 *                 name: "Extern"
 *             preference:
 *               - id: 1
 *                 name: "M"
 *               - id: 2
 *                 name: "B"
 *               - id: 3
 *                 name: "A"
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
  professorController.getProfessorMappings,
);

/**
 * @swagger
 * /app/professors:
 *   post:
 *     summary: Create a new professors
 *     tags: [Professors]
 *     parameters:
 *       - in: body
 *         name: professor
 *         schema:
 *           type: object
 *           properties:
 *             titel:
 *               type: string
 *               example: "Prof. Dr."
 *             vorname:
 *               type: string
 *               example: "Max"
 *             name:
 *               type: string
 *               example: "Mustermann"
 *             email:
 *               type: string
 *               example: "Max.Mustermann@test.de"
 *             telefonnummer:
 *               type: string
 *               example: "0123456789"
 *             vorliebeId:
 *               type: integer
 *               example: 3
 *             dozenten_statusId:
 *               type: integer
 *               example: 1
 *           example:
 *             titel: "Prof. Dr."
 *             vorname: "Max"
 *             name: "Mustermann"
 *             email: "Max.Mustermann@test.de"
 *             telefonnummer: "0123456789"
 *             vorliebeId: 3
 *             dozenten_statusId: 1
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
 *                   example: 27
 *                 titel:
 *                   type: string
 *                   example: "Prof. Dr."
 *                 name:
 *                   type: string
 *                   example: "Mustermann"
 *                 vorname:
 *                   type: string
 *                   example: "Max"
 *                 email:
 *                   type: string
 *                   example: "Max.Mustermann@test.de"
 *                 telefonnummer:
 *                   type: string
 *                   example: "0123456789"
 *                 vorliebeId:
 *                   type: integer
 *                   example: 3
 *                 dozenten_statusId:
 *                   type: integer
 *                   example: 1
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-02-18T22:23:17.960Z"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-02-18T22:23:17.960Z"
 *             example:
 *               id: 27
 *               titel: "Prof. Dr."
 *               name: "Mustermann"
 *               vorname: "Max"
 *               email: "Max.Mustermann@test.de"
 *               telefonnummer: "0123456789"
 *               vorliebeId: 3
 *               dozenten_statusId: 1
 *               updatedAt: "2026-02-18T22:23:17.960Z"
 *               createdAt: "2026-02-18T22:23:17.960Z"
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
  validate.validateProfessorBody,
  professorController.postProfessor,
);

module.exports = router;
