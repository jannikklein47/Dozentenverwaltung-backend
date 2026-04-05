const express = require("express");
const router = express.Router();
const reportController = require("./report.controller");

/**
 * @swagger
 * /app/reports/professors/without-provadis:
 *   get:
 *     summary: Get all professors without Provadis affiliation
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
 *         description: A list of professors without Provadis affiliation
 *       500:
 *         description: Server error
 */

router.get(
  "/professors/without-provadis",
  reportController.getProfessorsWithoutProvadis,
);

module.exports = router;