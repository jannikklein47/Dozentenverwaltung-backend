const APIError = require("../../../../utils/error");
const {
  Dozent,
  Vorlesung,
  Vorlesung_Dozent,
  Gehalten_An,
  Abschluss_Typ,
  Vorlesung_Status,
  Vorliebe,
  Dozenten_Status,
  sequelize,
} = require("../../../../models");
const Logger = require("../../../../utils/logger");
const { Op } = require("sequelize");

const { sendAsCSV } = require("../../../../utils/export/csv-exporter");
const { sendAsJSON } = require("../../../../utils/export/json-exporter");

const buildGivenName = (professor) =>
  [professor.vorname, professor.zweiter_vorname].filter(Boolean).join(" ");

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
}

exports.getProfessorsWithoutProvadis = async (req, res, next) => {
  try {
    const result = await Dozent.findAll({
      include: [
        {
          model: Vorlesung,
          as: "lectures",
          attributes: ["id", "name", "kuerzel", "semester"],
          required: false,
          through: {
            attributes: ["vorlaufzeit", "gehalten_anId"],
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
          where: {
            id: {
              [Op.notIn]: sequelize.literal(`
                (
                  SELECT vd.vorlesungId
                  FROM Vorlesung_Dozent vd
                  INNER JOIN Gehalten_An ga ON ga.id = vd.gehalten_anId
                  WHERE vd.dozentId = Dozent.id
                    AND ga.name = 'Provadis'
                )
              `),
            },
          },
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
      order: [
        ["id", "ASC"],
        [{ model: Vorlesung, as: "lectures" }, "id", "ASC"],
      ],
    });

    return handleExportOrResponse(req, res, {
      data: result,
      total: result.length,
      responseKey: "professors",
      filename: "report-format-2(professoren-ohne-provadis)",
      csvMapper: (prof) => {
        const formattedLectures = prof.lectures && prof.lectures.length > 0
          ? prof.lectures.map((l) => {
              const type = l.completionType ? l.completionType.name : "N/A";
              const status = l.lectureStatus ? l.lectureStatus.name : "N/A";
              const vorlaufzeit = l.Vorlesung_Dozent ? l.Vorlesung_Dozent.vorlaufzeit : "N/A";
              return `${l.name} (${l.kuerzel} | Sem: ${l.semester} | Typ: ${type} | Status: ${status} | Vorlaufzeit: ${vorlaufzeit})`;
            }).join(" ; ")
          : "Keine Vorlesungen";

        return {
          ID: prof.id,
          Titel: prof.titel || "",
          Vorname: buildGivenName(prof),
          Name: prof.name,
          Email: prof.email || "",
          Telefonnummer: prof.telefonnummer || "",
          Status: prof.professorStatus ? prof.professorStatus.name : "",
          Vorliebe: prof.preference ? prof.preference.name : "",
          Vorlesungen: formattedLectures,
        };
      },
    });
  } catch (error) {
    console.error(error);
    next(
      new APIError(
        "Failed to fetch professors and lectures without Provadis",
        500,
      ),
    );
  }
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
      include: [
        {
          model: Gehalten_An,
          attributes: [],
          required: true,
          where: {
            name: "Provadis",
          },
        },
      ],
      attributes: ["vorlesungId"],
      group: ["vorlesungId"],
      raw: true,
    });

    const lecturesWithoutProvadisProfessor = await Vorlesung_Dozent.findAll({
      include: [
        {
          model: Gehalten_An,
          attributes: [],
          required: true,
          where: {
            name: {
              [Op.ne]: "Provadis",
            },
          },
        },
      ],
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
    const provadisType = await Gehalten_An.findOne({
      where: {
        name: "Provadis",
      },
      attributes: ["id"],
    });

    if (!provadisType) {
      return handleExportOrResponse(req, res, {
        data: [],
        total: 0,
        responseKey: "professors",
        filename: "report-format-1(professoren-mit-provadis-vorlesungen)",
        csvMapper: () => ({}),
      });
    }

    const professorsWithProvadisLectures = await Dozent.findAndCountAll({
      limit,
      offset,
      attributes: [
        "id",
        "titel",
        "vorname",
        "zweiter_vorname",
        "name",
        "email",
        "telefonnummer",
      ],
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
              gehalten_anId: provadisType.id,
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
        Vorname: buildGivenName(prof),
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
