const APIError = require("../../../../utils/error");
const {
  Dozent,
  Vorlesung,
  Dozenten_Status,
  Vorlesung_Dozent,
  Vorliebe,
  sequelize,
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
      attributes: [
        "id",
        "titel",
        "vorname",
        "name",
        "email",
        "telefonnummer",
        "prio_bachelor",
        "prio_master",
      ],
      distinct: true,
      include: [
        {
          model: Vorlesung,
          as: "lectures",
          attributes: ["id", "name", "kuerzel"],
          through: { attributes: ["vorlaufzeit"] },
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

exports.getAllProfessorsForLecture = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const lectureId = parseInt(req.params.id);

    const whereConditions = {
      id: {
        [Op.in]: sequelize.literal(`(
          SELECT DozentId
          FROM Vorlesung_Dozent
          WHERE VorlesungId = ${sequelize.escape(lectureId)}
        )`),
      },
    };

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
      attributes: [
        "id",
        "titel",
        "vorname",
        "name",
        "email",
        "telefonnummer",
        "prio_bachelor",
        "prio_master",
        [
          sequelize.literal(`
            (SELECT vorliebeId FROM Vorlesung_Dozent WHERE DozentId = Dozent.id AND VorlesungId = ${sequelize.escape(lectureId)})
          `),
          "lectureVorliebeId",
        ],
        [
          sequelize.literal(`
            (SELECT v.name FROM Vorliebe v JOIN Vorlesung_Dozent vd on v.id = vd.vorliebeId WHERE vd.DozentId = Dozent.id AND vd.VorlesungId = ${sequelize.escape(lectureId)})
         `),
          "lectureVorliebeName",
        ],
        [
          sequelize.literal(`
            (SELECT gehalten_anId FROM Vorlesung_Dozent WHERE DozentId = Dozent.id AND VorlesungId = ${sequelize.escape(lectureId)})
          `),
          "lectureGehalten_anId",
        ],
        [
          sequelize.literal(`
            (SELECT g.name FROM Gehalten_An g JOIN Vorlesung_Dozent vd on g.id = vd.gehalten_anId WHERE vd.DozentId = Dozent.id AND vd.VorlesungId = ${sequelize.escape(lectureId)})
          `),
          "lectureGehalten_anName",
        ],
        [
          sequelize.literal(`
            (SELECT vorlaufzeit FROM Vorlesung_Dozent WHERE DozentId = Dozent.id AND VorlesungId = ${sequelize.escape(lectureId)} LIMIT 1)
          `),
          "lectureVorlaufzeit",
        ],
      ],
      distinct: true,
      include: [
        {
          model: Vorlesung,
          as: "lectures",
          attributes: ["id", "name", "kuerzel"],
          through: { attributes: ["vorlaufzeit"] },
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

exports.addLectureToProfessor = async (req, res, next) => {
  const t = await Dozent.sequelize.transaction();
  try {
    if (
      (await Dozent.findByPk(req.body.dozentId, { transaction: t })) ||
      (await Vorlesung.findByPk(req.body.vorlesungId, { transaction: t }))
    ) {
      return next(APIError.errorNotFound());
    }

    await Vorlesung_Dozent.create(
      {
        vorlesungId: req.body.lectureId,
        dozentId: req.body.professorId,
        gehalten_anId: req.body.gehalten_anId,
        vorliebeId: req.body.vorliebeId || null,
        vorlaufzeit: req.body.vorlaufzeit,
      },
      { transaction: t },
    );

    await t.commit();
    res.status(201).json({ success: true });
  } catch (error) {
    await t.rollback();
    console.error(error);
    next(APIError.errorUnknown());
  }
};

exports.removeLectureFromProfessor = async (req, res, next) => {
  const t = await Dozent.sequelize.transaction();
  try {
    const { professorId, lectureId } = req.query;

    if (
      !(await Dozent.findByPk(professorId, { transaction: t })) ||
      !(await Vorlesung.findByPk(lectureId, { transaction: t }))
    ) {
      return next(APIError.errorNotFound());
    }

    await Vorlesung_Dozent.destroy({
      where: {
        dozentId: professorId,
        vorlesungId: lectureId,
      },
      transaction: t,
    });

    await t.commit();
    res.status(200).json({ success: true });
  } catch (error) {
    await t.rollback();
    console.error(error);
    next(APIError.errorUnknown());
  }
};

exports.updateProfessor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const professor = await Dozent.findByPk(req.params.id);
    if (!professor) {
      return next(APIError.errorNotFound());
    }
    const existingProfessorWithEmail = await Dozent.findOne({
      where: {
        email,
        id: { [Op.ne]: id },
      },
    });

    if (existingProfessorWithEmail) {
      return next(APIError.errorRessourceAlreadyExists());
    }

    const existingProfessorWithPhone = await Dozent.findOne({
      where: {
        telefonnummer: req.body.telefonnummer,
        id: { [Op.ne]: id },
      },
    });

    if (existingProfessorWithPhone) {
      return next(APIError.errorRessourceAlreadyExists());
    }
    await professor.update(req.body);
    res.status(200).json({
      message: "Professor updated successfully",
      professor,
    });
  } catch (error) {
    console.error(error);
    next(APIError.errorUnknown());
  }
};

exports.deleteProfessor = async (req, res, next) => {
  const t = await Dozent.sequelize.transaction();
  try {
    const { id } = req.params;
    const professor = await Dozent.findByPk(id, { transaction: t });
    if (!professor) {
      await t.rollback();
      return next(APIError.errorNotFound());
    }

    await Vorlesung_Dozent.destroy({
      where: { dozentId: id },
      transaction: t,
    });
    await professor.destroy({ transaction: t });
    await t.commit();
    res.status(200).json({ message: "Professor deleted successfully" });
  } catch (error) {
    await t.rollback();
    console.error(error);
    next(APIError.errorUnknown());
  }
};
