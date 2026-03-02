const APIError = require("../../../../utils/error");
const {
  Dozent,
  Vorlesung,
  Abschluss_Typ,
  Vorlesung_Status,
  sequelize,
} = require("../../../../models");
const { Op } = require("sequelize");

exports.getAllLectures = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await Vorlesung.findAndCountAll({
      limit,
      offset,

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
      total: count,
      lectures: rows,
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
      whereConditions[Op.and] = terms.map((t) => ({
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

    res.status(200).json({
      completionTyp: AbschlussTyp,
      lectureStatus: VorlesungStatus,
    });
  } catch (error) {
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
