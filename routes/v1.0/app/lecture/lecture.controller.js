const APIError = require("../../../../utils/error");
const {
  Dozent,
  Vorlesung,
  Abschluss_Typ,
  Vorlesung_Status,
  Gehalten_An,
  Vorliebe,
  sequelize,
} = require("../../../../models");
const { Op } = require("sequelize");

exports.getAllLectures = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const {
      term,
      vorlesung_statusId,
      abschluss_typId,
      gehalten_anId,
      semester,
      vorlaufzeit,
    } = req.query;

    const clauses = [];

    if (vorlaufzeit)
      clauses.push(`vorlaufzeit = ${sequelize.escape(vorlaufzeit)}`);

    if (gehalten_anId)
      clauses.push(`gehalten_anId = ${sequelize.escape(gehalten_anId)}`);

    const subQuerySql =
      clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "";

    const whereConditions =
      clauses.length > 0
        ? {
            id: {
              [Op.in]: sequelize.literal(`(
                SELECT VorlesungId
                FROM Vorlesung_Dozent
                ${subQuerySql}
              )`),
            },
          }
        : {};

    if (term) {
      const terms = term.trim().split(/\s+/);
      whereConditions[Op.or] = terms.map((t) => ({
        name: { [Op.like]: `%${t}%` },
      }));
    }

    if (vorlesung_statusId) {
      whereConditions.vorlesung_statusId = vorlesung_statusId;
    }

    if (abschluss_typId) {
      whereConditions.abschluss_typId = abschluss_typId;
    }

    if (semester) {
      whereConditions.semester = semester;
    }

    const { count, rows } = await Vorlesung.findAndCountAll({
      limit,
      offset,
      attributes: ["id", "name", "kuerzel", "semester"],
      distinct: true,
      where: whereConditions,
      include: [
        {
          model: Dozent,
          as: "professors",
          attributes: ["id", "vorname", "name"],
          through: { attributes: ["vorlaufzeit", "gehalten_anId"] },
          required: false,
        },
        {
          model: Abschluss_Typ,
          as: "completionType",
          attributes: ["name", "id"],
        },
        {
          model: Vorlesung_Status,
          as: "lectureStatus",
          attributes: ["name", "id"],
        },
      ],
      order: [["id", "ASC"]],
    });

    res.status(200).json({
      total: count,
      lectures: rows,
    });
  } catch (error) {
    next(APIError.errorUnknown());
  }
};

exports.getLectureById = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const lectureId = parseInt(req.params.id);

    const lecture = await Vorlesung.findOne({
      limit,
      offset,
      where: { id: lectureId },
      attributes: ["id", "name", "kuerzel", "semester"],
      distinct: true,
      include: [
        {
          model: Dozent,
          as: "professors",
          attributes: ["id", "vorname", "name"],
          through: { attributes: ["vorlaufzeit"] },
        },
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
      order: [["id", "ASC"]],
    });

    res.status(200).json({
      lecture,
    });
  } catch (error) {
    next(APIError.errorUnknown());
  }
};

exports.getLecturesOfProfessor = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;
    const professorId = parseInt(req.params.id);

    const {
      term,
      vorlesung_statusId,
      abschluss_typId,
      semester,
      gehalten_anId,
      vorliebeId,
      vorlaufzeit,
    } = req.query;

    let subQueryConditions = `WHERE DozentId = ${sequelize.escape(professorId)}`;

    if (gehalten_anId) {
      subQueryConditions += ` AND gehalten_anId = ${sequelize.escape(gehalten_anId)}`;
    }
    if (vorliebeId) {
      subQueryConditions += ` AND vorliebeId = ${sequelize.escape(vorliebeId)}`;
    }
    if (vorlaufzeit) {
      subQueryConditions += ` AND vorlaufzeit = ${sequelize.escape(vorlaufzeit)}`;
    }

    const whereConditions = {
      id: {
        [Op.in]: sequelize.literal(`(
          SELECT VorlesungId
          FROM Vorlesung_Dozent
          ${subQueryConditions}
        )`),
      },
    };

    if (term) {
      const terms = term.trim().split(/\s+/);
      whereConditions[Op.or] = terms.map((t) => ({
        name: { [Op.like]: `%${t}%` },
      }));
    }

    if (vorlesung_statusId) {
      whereConditions.vorlesung_statusId = vorlesung_statusId;
    }

    if (abschluss_typId) {
      whereConditions.abschluss_typId = abschluss_typId;
    }

    if (semester) {
      whereConditions.semester = semester;
    }

    const { count, rows } = await Vorlesung.findAndCountAll({
      limit,
      offset,
      attributes: [
        "id",
        "name",
        "kuerzel",
        "semester",
        [
          sequelize.literal(
            `(SELECT vorliebeId FROM Vorlesung_Dozent WHERE VorlesungId = Vorlesung.id AND DozentId = ${sequelize.escape(professorId)} LIMIT 1)`,
          ),
          "vorliebeId",
        ],
        [
          sequelize.literal(
            `(SELECT gehalten_anId FROM Vorlesung_Dozent WHERE VorlesungId = Vorlesung.id AND DozentId = ${sequelize.escape(professorId)} LIMIT 1)`,
          ),
          "gehalten_anId",
        ],
        [
          sequelize.literal(`(
        SELECT v.name 
        FROM Vorliebe v
        JOIN Vorlesung_Dozent vd ON v.id = vd.vorliebeId
        WHERE vd.VorlesungId = Vorlesung.id 
        AND vd.DozentId = ${sequelize.escape(professorId)}
        LIMIT 1
      )`),
          "vorliebeName",
        ],
        [
          sequelize.literal(`(
        SELECT g.name 
        FROM Gehalten_An g
        JOIN Vorlesung_Dozent vd ON g.id = vd.gehalten_anId
        WHERE vd.VorlesungId = Vorlesung.id 
        AND vd.DozentId = ${sequelize.escape(professorId)}
        LIMIT 1
      )`),
          "gehalten_anName",
        ],
        [
          sequelize.literal(
            `(SELECT vorlaufzeit FROM Vorlesung_Dozent WHERE VorlesungId = Vorlesung.id AND DozentId = ${sequelize.escape(professorId)} LIMIT 1)`,
          ),
          "vorlaufzeit",
        ],
      ],
      distinct: true,
      where: whereConditions,
      include: [
        {
          model: Dozent,
          as: "professors",
          attributes: ["id", "vorname", "name"],
          through: {
            attributes: ["vorliebeId", "gehalten_anId", "vorlaufzeit"],
          },
          required: false,
        },
        {
          model: Abschluss_Typ,
          as: "completionType",
          attributes: ["name", "id"],
        },
        {
          model: Vorlesung_Status,
          as: "lectureStatus",
          attributes: ["name", "id"],
        },
      ],
      order: [["id", "ASC"]],
    });

    res.status(200).json({
      total: count,
      lectures: rows,
    });
  } catch (error) {
    console.error(error);
    next(APIError.errorUnknown());
  }
};

exports.getLectureMappings = async (req, res, next) => {
  try {
    const AbschlussTyp = await Abschluss_Typ.findAll({
      attributes: ["id", "name"],
    });

    const VorlesungStatus = await Vorlesung_Status.findAll({
      attributes: ["id", "name"],
    });

    const GehaltenAn = await Gehalten_An.findAll({
      attributes: ["id", "name"],
    });

    const VorliebeResult = await Vorliebe.findAll({
      attributes: ["id", "name"],
    });

    res.status(200).json({
      completionType: AbschlussTyp,
      lectureStatus: VorlesungStatus,
      preference: VorliebeResult,
      gehalten_an: GehaltenAn,
    });
  } catch (error) {
    console.error(error);
    next(APIError.errorUnknown());
  }
};

exports.postLecture = async (req, res, next) => {
  const t = await Vorlesung.sequelize.transaction();

  try {
    const { name, kuerzel, vorlesung_statusId, abschluss_typId, semester } =
      req.body;
    const professorIds = req.body.professorIds || [];

    if (await Vorlesung.findOne({ where: { kuerzel } }, { transaction: t })) {
      await t.rollback();
      return next(APIError.errorRessourceAlreadyExists());
    }

    const newLecture = await Vorlesung.create(
      {
        name,
        kuerzel,
        vorlesung_statusId,
        abschluss_typId,
        semester,
      },
      {
        transaction: t,
      },
    );

    // await newLecture.addProfessors(professorIds, { transaction: t });

    await t.commit();

    res.status(201).json(newLecture);
  } catch (error) {
    await t.rollback("Failed to create lecture and associate professors");
    next(APIError.errorUnknown());
  }
};
