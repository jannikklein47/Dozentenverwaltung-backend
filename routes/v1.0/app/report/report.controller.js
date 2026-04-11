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
const { Op } = require("sequelize");

const { sendAsCSV } = require("../../../../utils/export/csv-exporter");
const { sendAsJSON } = require("../../../../utils/export/json-exporter");

const handleExportOrResponse = (req, res, options) => {
  const { data, total, responseKey, filename, csvMapper } = options;
  const format = req.query.format;

  if (format === "csv") {
    const flatData = data.map(csvMapper);
    return sendAsCSV(res, filename, flatData);
  }

  if (format === "json") {
    return sendAsJSON(res, filename, data);
  }

  return res.json({
    total: total,
    [responseKey]: data,
  });
};

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

    return handleExportOrResponse(req, res, {
      data: lectures.rows,
      total: lectures.count,
      responseKey: "lectures",
      filename: "report-format-3(vorlesungen-ohne-dozenten)",
      csvMapper: (lecture) => ({
        ID: lecture.id,
        Name: lecture.name,
        Semester: lecture.semester,
        CompletionType: lecture.completionType ? lecture.completionType.name : "",
        Status: lecture.lectureStatus ? lecture.lectureStatus.name : "",
      }),
    });

  } catch (error) {
    Logger.error(`Failed to fetch lectures without professor: ${error.message}`);
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

    const blacklistLectureIds = lecturesProvadis.map((a) => a.vorlesungId);
    const LecturesWithoutProvadis = lecturesWithoutProvadisProfessor.map((a) => a.vorlesungId);

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

    return handleExportOrResponse(req, res, {
      data: lectures.rows,
      total: lectures.count,
      responseKey: "lectures",
      filename: "report-format-4(vorlesungen-ohne-provadis-erfahrung)",
      csvMapper: (lecture) => ({
        ID: lecture.id,
        Name: lecture.name,
        Semester: lecture.semester,
        CompletionType: lecture.completionType ? lecture.completionType.name : "",
        Status: lecture.lectureStatus ? lecture.lectureStatus.name : "",
      }),
    });

  } catch (error) {
    Logger.error(`Failed to fetch lectures without provadis experience: ${error.message}`);
    next(new APIError(500, "Error fetching lectures without provadis experience"));
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

    return handleExportOrResponse(req, res, {
      data: professorsWithProvadisLectures.rows,
      total: professorsWithProvadisLectures.count,
      responseKey: "professors",
      filename: "report-format-1(professoren-mit-provadis-vorlesungen)",
      csvMapper: (prof) => ({
        ID: prof.id,
        Titel: prof.titel || "",
        Vorname: prof.vorname,
        Name: prof.name,
        Email: prof.email,
        Telefonnummer: prof.telefonnummer,
        Status: prof.professorStatus ? prof.professorStatus.name : "",
        Vorliebe: prof.preference ? prof.preference.name : "",
        Lectures: prof.lectures ? prof.lectures.map((l) => l.name).join(", ") : "",
      }),
    });

  } catch (error) {
    Logger.error(`Failed to fetch professors with Provadis lectures: ${error.message}`);
    next(new APIError(500, "Error fetching professors with Provadis lectures"));
  }
};