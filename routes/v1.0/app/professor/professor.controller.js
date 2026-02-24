const APIError = require("../../../../utils/error");
const {
  Dozent,
  Vorlesung,
  Dozenten_Status,
  Vorliebe,
} = require("../../../../models");

const { Op } = require("sequelize");

exports.getAllProfessors = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const whereConditions = {};

    if (req.query.term) {
      const terms = req.query.term.trim().split(/\s+/);
      whereConditions[Op.and] = terms.map((term) => ({
        [Op.or]: [
          { vorname: { [Op.like]: `%${term}%` } },
          { name: { [Op.like]: `%${term}%` } },
        ],
      }));
    }

    if (req.query.dozenten_statusId) {
      whereConditions.dozenten_statusId = req.query.dozenten_statusId;
    }

    if (req.query.vorliebeId) {
      whereConditions.vorliebeId = req.query.vorliebeId;
    }

    const { count, rows } = await Dozent.findAndCountAll({
      limit,
      offset,
      where: whereConditions,
      attributes: ["id", "titel", "vorname", "name", "email", "telefonnummer"],
      distinct: true,
      include: [
        {
          model: Vorlesung,
          as: "lectures",
          attributes: ["id", "name", "kuerzel"],
          through: { attributes: [] },
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

    res.status(200).json({
      total: count,
      professors: rows,
    });
  } catch (error) {
    console.error(error);
    next(APIError.errorUnknown());
  }
};

exports.getProfessorById = async (req, res, next) => {
  try {
    const result = await Dozent.findByPk(req.params.id, {
      include: [
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
    });

    res.status(200).json({
      professor: result,
    });
  } catch (error) {
    console.error(error);
    next(APIError.errorUnknown());
  }
};

exports.getProfessorMappings = async (req, res, next) => {
  try {
    const professorStatus = await Dozenten_Status.findAll({
      attributes: ["id", "name"],
    });

    const preference = await Vorliebe.findAll({
      attributes: ["id", "name"],
    });

    res.status(200).json({
      professor_status: professorStatus,
      preference: preference,
    });
  } catch (error) {
    console.error(error);
    next(APIError.errorUnknown());
  }
};

exports.postProfessor = async (req, res, next) => {
  try {
    const {
      titel,
      name,
      vorname,
      email,
      telefonnummer,
      vorliebeId,
      dozenten_statusId,
      prio_bachelor,
      prio_master,
    } = req.body;

    if (await Dozent.findOne({ where: { email } })) {
      return next(APIError.errorRessourceAlreadyExists());
    }
    if (await Dozent.findOne({ where: { telefonnummer } })) {
      return next(APIError.errorRessourceAlreadyExists());
    }

    const newProfessor = await Dozent.create({
      titel,
      name,
      vorname,
      email,
      telefonnummer,
      vorliebeId,
      dozenten_statusId,
      prio_bachelor,
      prio_master,
    });

    res.status(201).json(newProfessor);
  } catch (error) {
    console.error(error);
    next(APIError.errorUnknown());
  }
};
