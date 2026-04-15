const express = require("express");
const router = express.Router();
const reportController = require("./report.controller");

/**
 * @swagger
 * /app/reports/professors/without-provadis:
 *   get:
 *     summary: Get all professors with lectures they can teach but have never held at Provadis
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
 *         description: A list of professors with their lectures excluding lectures already held at Provadis, including Bachelor and Master information
 *       500:
 *         description: Server error
 */

router.get(
  "/professors/without-provadis",
  reportController.getProfessorsWithoutProvadis,
);

module.exports = router;
