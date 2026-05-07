const express = require("express");
const router = express.Router();
const professorController = require("./professor.controller");
const validate = require("./professor.validate");

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
 *   get:
 *     summary: Get all professors with their associated lectures
 *     tags: [Professors]
 *     parameters:
 *       - in: query
 *         name: term
 *         schema:
 *           type: string
 *         description: A search term
 *       - in: query
 *         name: vorliebeId
 *         schema:
 *           type: integer
 *         description: The id of the Vorliebe
 *       - in: query
 *         name: dozenten_statusId
 *         schema:
 *           type: integer
 *         description: The id of the Dozenten_Status
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
 *                     zweiter_vorname:
 *                       type: string
 *                       nullable: true
 *                       example: "Karl"
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
 *                           Vorlesung_Dozent:
 *                             type: object
 *                             properties:
 *                               vorlaufzeit:
 *                                 type: string
 *                                 example: "M"
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
  validate.validateProfessorFilter,
  professorController.getAllProfessors,
);

/**
 * @swagger
 * /app/professors/lecture/{id}:
 *   get:
 *     summary: Get all professors for a specific lecture
 *     tags: [Professors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the lecture
 *       - in: query
 *         name: term
 *         schema:
 *           type: string
 *         description: A search term
 *       - in: query
 *         name: vorliebeId
 *         schema:
 *           type: integer
 *         description: The id of the Vorliebe
 *       - in: query
 *         name: dozenten_statusId
 *         schema:
 *           type: integer
 *         description: The id of the Dozenten_Status
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
 *                     zweiter_vorname:
 *                       type: string
 *                       nullable: true
 *                       example: "Karl"
 *                     name:
 *                       type: string
 *                       example: "Mueller"
 *                     email:
 *                       type: string
 *                       example: "t.mueller@fh.de"
 *                     telefonnummer:
 *                       type: string
 *                       example: "0123-100"
 *                     lectureVorliebeId:
 *                       type: integer
 *                       example: 1
 *                     lectureVorliebeName:
 *                       type: string
 *                       example: "A"
 *                     lectureGehalten_anId:
 *                       type: integer
 *                       example: 1
 *                     lectureGehalten_anName:
 *                       type: string
 *                       example: "Intern"
 *                     lectureVorlaufzeit:
 *                       type: string
 *                       example: "M"
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
 *                           Vorlesung_Dozent:
 *                             type: object
 *                             properties:
 *                               vorlaufzeit:
 *                                 type: string
 *                                 example: "M"
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
  "/lecture/:id",
  // checkauth,
  validate.validateLectureId,
  validate.validateProfessorQuery,
  validate.validateProfessorFilter,
  professorController.getAllProfessorsForLecture,
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
 *                     zweiter_vorname:
 *                       type: string
 *                       nullable: true
 *                       example: "Karl"
 *                     name:
 *                       type: string
 *                       example: "Mueller"
 *                     email:
 *                       type: string
 *                       example: "t.mueller@fh.de"
 *                     telefonnummer:
 *                       type: string
 *                       example: "0123-100"
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
 * /app/professors/assign:
 *   patch:
 *     summary: Update an existing assignment of professor and lecture
 *     tags: [Professors,Lectures]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               professorId:
 *                 type: integer
 *                 example: 1
 *               lectureId:
 *                 type: integer
 *                 example: 1
 *               gehalten_anId:
 *                 type: integer
 *                 example: 2
 *               vorliebeId:
 *                 type: integer
 *                 nullable: true
 *                 example: 3
 *               vorlaufzeit:
 *                 type: string
 *                 example: "4"
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Assignment not found
 *       500:
 *         description: Internal Server Error
 */
router.patch(
  "/assign",
  // checkauth,
  validate.validateUpdateLectureToProfessorBody,
  professorController.updateLectureToProfessor,
);

/**
 * @swagger
 * /app/professors/{id}:
 *   patch:
 *     summary: Update an existing professor
 *     tags: [Professors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the professor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titel:
 *                 type: string
 *                 example: "Prof. Dr."
 *               vorname:
 *                 type: string
 *                 example: "Max"
 *               zweiter_vorname:
 *                 type: string
 *                 nullable: true
 *                 example: "Karl"
 *               name:
 *                 type: string
 *                 example: "Mustermann"
 *               email:
 *                 type: string
 *                 example: "Max.Mustermann@test.de"
 *               telefonnummer:
 *                 type: string
 *                 example: "0123456789"
 *               vorliebeId:
 *                 type: integer
 *                 example: 3
 *               dozenten_statusId:
 *                 type: integer
 *                 example: 1
 *               prio_bachelor:
 *                 type: integer
 *                 example: 1
 *               prio_master:
 *                 type: integer
 *                 example: 0
 *           example:
 *             titel: "Prof. Dr."
 *             vorname: "Max"
 *             zweiter_vorname: "Karl"
 *             name: "Mustermann"
 *             email: "Max.Mustermann@test.de"
 *             telefonnummer: "0123456789"
 *             vorliebeId: 3
 *             dozenten_statusId: 1
 *             prio_bachelor: 1
 *             prio_master: 0
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Professor updated successfully"
 *                 professor:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 27
 *                     titel:
 *                       type: string
 *                       example: "Prof. Dr."
 *                     name:
 *                       type: string
 *                       example: "Mustermann"
 *                     vorname:
 *                       type: string
 *                       example: "Max"
 *                     zweiter_vorname:
 *                       type: string
 *                       nullable: true
 *                       example: "Karl"
 *                     email:
 *                       type: string
 *                       example: "Max.Mustermann@test.de"
 *                     telefonnummer:
 *                       type: string
 *                       example: "0123456789"
 *                     vorliebeId:
 *                       type: integer
 *                       example: 3
 *                     dozenten_statusId:
 *                       type: integer
 *                       example: 1
 *                     prio_bachelor:
 *                       type: integer
 *                       example: 1
 *                     prio_master:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.patch(
  "/:id",
  // checkauth,
  validate.validateProfessorId,
  validate.validateProfessorBodyOptional,
  professorController.updateProfessor,
);

/**
 * @swagger
 * /app/professors/assign:
 *   delete:
 *     summary: Delete assignment of professor and lecture
 *     tags: [Professors,Lectures]
 *     parameters:
 *       - in: query
 *         name: professorId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the professor
 *       - in: query
 *         name: lectureId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the lecture
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Assignment not found
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/assign",
  validate.validateRemoveLectureFromProfessorQuery,
  professorController.removeLectureFromProfessor,
);

/**
 * @swagger
 * /app/professors/{id}:
 *   delete:
 *     summary: Delete a professor by id
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
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Professor deleted successfully"
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/:id",
  // checkauth,
  validate.validateProfessorId,
  professorController.deleteProfessor,
);

/**
 * @swagger
 * /app/professors/assign:
 *   post:
 *     summary: Assign professor and lecture together
 *     tags: [Professors,Lectures]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               professorId:
 *                 type: integer
 *                 example: 1
 *               lectureId:
 *                 type: integer
 *                 example: 1
 *               gehalten_anId:
 *                 type: integer
 *                 example: 1
 *               vorliebeId:
 *                 type: integer
 *                 example: 1
 *               vorlaufzeit:
 *                 type: string
 *                 example: "M"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Professor or lecture not found
 *       409:
 *         description: Assignment already exists
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/assign",
  // checkauth,
  validate.validateAddLectureToProfessorBody,
  professorController.addLectureToProfessor,
);

/**
 * @swagger
 * /app/professors:
 *   post:
 *     summary: Create a new professors
 *     tags: [Professors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titel:
 *                 type: string
 *                 example: "Prof. Dr."
 *               vorname:
 *                 type: string
 *                 example: "Max"
 *               zweiter_vorname:
 *                 type: string
 *                 nullable: true
 *                 example: "Karl"
 *               name:
 *                 type: string
 *                 example: "Mustermann"
 *               email:
 *                 type: string
 *                 example: "Max.Mustermann@test.de"
 *               telefonnummer:
 *                 type: string
 *                 example: "0123456789"
 *               vorliebeId:
 *                 type: integer
 *                 example: 3
 *               dozenten_statusId:
 *                 type: integer
 *                 example: 1
 *               prio_bachelor:
 *                 type: integer
 *                 example: 1
 *               prio_master:
 *                 type: integer
 *                 example: 1
 *           example:
 *             titel: "Prof. Dr."
 *             vorname: "Max"
 *             zweiter_vorname: "Karl"
 *             name: "Mustermann"
 *             email: "Max.Mustermann@test.de"
 *             telefonnummer: "0123456789"
 *             vorliebeId: 3
 *             dozenten_statusId: 1
 *             prio_bachelor: 1
 *             prio_master: 1
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
 *                 zweiter_vorname:
 *                   type: string
 *                   nullable: true
 *                   example: "Karl"
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
 *               zweiter_vorname: "Karl"
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
