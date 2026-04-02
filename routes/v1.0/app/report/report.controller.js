const APIError = require("../../../../utils/error");
const { Vorlesung, Vorlesung_Dozent } = require("../../../../models");
const Logger = require("../../../../utils/logger");
const { Op } = require("sequelize");

exports.getLecturewithoutProfessor = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const lectureAssignments = await Vorlesung_Dozent.findAll({
      attributes: ["vorlesungId"],
      group: ["vorlesungId"],
      raw: true,
    });

    const assignedLectureIds = lectureAssignments.map(
      (assignment) => assignment.vorlesungId,
    );

    const lectures = await Vorlesung.findAll({
      where: {
        id: {
          [Op.notIn]: assignedLectureIds.length > 0 ? assignedLectureIds : [0],
        },
      },
      limit,
      offset,
    });
    res.json(lectures);
  } catch (error) {
    Logger.error(
      `Failed to fetch lectures without professor: ${error.message}`,
    );
    next(new APIError(500, "Error fetching lectures without professor"));
  }
};
