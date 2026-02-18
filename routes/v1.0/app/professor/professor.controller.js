const APIError = require("../../../../utils/error");
const {
  Dozent,
  Vorlesung,
  Dozenten_Status,
  Vorliebe,
} = require("../../../../models");

exports.getAllProfessors = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;

    const { count, rows } = await Dozent.findAndCountAll({
      limit: limit,
      offset: offset,

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
