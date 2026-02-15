const { Transaction } = require("sequelize");
const {
  Dozent,
  Vorlesung,
  Abschluss_Typ,
  Vorlesung_Status,
} = require("../../../../models");

exports.getAllLectures = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;

    const { count, rows } = await Vorlesung.findAndCountAll({
      limit: limit,
      offset: offset,

      attributes: ["id", "name", "semester"],
      distinct: true,
      include: [
        {
          model: Dozent,
          as: "professors",
          attributes: ["vorname", "name"],
          through: { attributes: [] },
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
    next(error);
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
    next(error);
  }
};

exports.postLecture = async (req, res, next) => {
  const t = await Vorlesung.sequelize.transaction();

  try {
    const { name, vorlesung_statusId, abschluss_typId, semester } = req.body;
    const professorIds = req.body.professorIds || [];

    const newLecture = await Vorlesung.create(
      {
        name,
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
    next(error);
  }
};
