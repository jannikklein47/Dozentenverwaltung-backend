const APIError = require("../../../../utils/error");
const {
  Dozent,
  Vorlesung,
  Vorlesung_Dozent,
  Abschluss_Typ,
  Vorlesung_Status,
  Vorliebe,
  Dozenten_Status,
} = require("../../../../models");
const Logger = require("../../../../utils/logger");
const { Op, where } = require("sequelize");

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

    const lectures = await Vorlesung.findAndCountAll({
      where: {
        id: {
          [Op.notIn]: assignedLectureIds.length > 0 ? assignedLectureIds : [0],
        },
      },
      include: [
        {
          model: Abschluss_Typ,
          as: "completionType",
          attributes: ["name"],
        },
        {
          model: Vorlesung_Status,
          as: "lectureStatus",
          attributes: ["name"],
        },
      ],
      limit,
      offset,
    });
    res.json({ total: lectures.count, lectures: lectures.rows });
  } catch (error) {
    Logger.error(
      `Failed to fetch lectures without professor: ${error.message}`,
    );
    next(new APIError(500, "Error fetching lectures without professor"));
  }
};

exports.getLecturewithoutProvadisExperience = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const lecturesProvadis = await Vorlesung_Dozent.findAll({
      where: {
        gehalten_anid: 1,
      },
      attributes: ["vorlesungId"],
      group: ["vorlesungId"],
      raw: true,
    });

    const lecturesWithoutProvadisProfessor = await Vorlesung_Dozent.findAll({
      where: {
        gehalten_anid: 2,
      },
      attributes: ["vorlesungId"],
      group: ["vorlesungId"],
      raw: true,
    });

    const blacklistLectureIds = lecturesProvadis.map(
      (assignment) => assignment.vorlesungId,
    );

    const LecturesWithoutProvadis = lecturesWithoutProvadisProfessor.map(
      (assignment) => assignment.vorlesungId,
    );

    const finalLectureIds = LecturesWithoutProvadis.filter(
      (id) => !blacklistLectureIds.includes(id),
    );

    const lectures = await Vorlesung.findAndCountAll({
      where: {
        id: {
          [Op.in]: finalLectureIds.length > 0 ? finalLectureIds : [0],
        },
      },
      include: [
        {
          model: Abschluss_Typ,
          as: "completionType",
          attributes: ["name"],
        },
        {
          model: Vorlesung_Status,
          as: "lectureStatus",
          attributes: ["name"],
        },
      ],
      limit,
      offset,
    });
    res.json({ total: lectures.count, lectures: lectures.rows });
  } catch (error) {
    Logger.error(
      `Failed to fetch lectures without professor: ${error.message}`,
    );
    next(new APIError(500, "Error fetching lectures without professor"));
  }
};

exports.getProfessorWithProvadisLectures = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const professorsWithProvadisLectures = await Dozent.findAndCountAll({
      limit,
      offset,
      attributes: ["id", "titel", "vorname", "name", "email", "telefonnummer"],
      distinct: true,
      include: [
        {
          model: Vorlesung,
          as: "lectures",
          required: true,
          attributes: ["id", "name", "kuerzel"],
          through: {
            attributes: ["vorlaufzeit"],
            where: {
              gehalten_anId: 1,
            },
          },
          include: [
            {
              model: Abschluss_Typ,
              as: "completionType",
              attributes: ["name"],
            },
            {
              model: Vorlesung_Status,
              as: "lectureStatus",
              attributes: ["name"],
            },
          ],
        },
        {
          model: Dozenten_Status,
          as: "professorStatus",
          attributes: ["name"],
        },
        {
          model: Vorliebe,
          as: "preference",
          attributes: ["name"],
        },
      ],
      order: [["id", "ASC"]],
    });

    res.json({
      total: professorsWithProvadisLectures.count,
      professors: professorsWithProvadisLectures.rows,
    });
  } catch (error) {
    Logger.error(
      `Failed to fetch professors with Provadis lectures: ${error.message}`,
    );
    next(new APIError(500, "Error fetching professors with Provadis lectures"));
  }
};
