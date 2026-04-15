const APIError = require("../../../../utils/error");
const { Dozent, Vorlesung, Abschluss_Typ, sequelize } = require("../../../../models");
const { Op } = require("sequelize");

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
              attributes: ["id", "name"],
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
      ],
      order: [
        ["id", "ASC"],
        [{ model: Vorlesung, as: "lectures" }, "id", "ASC"],
      ],
    });

    res.status(200).json(result);
  } catch (error) {
    next(new APIError("Failed to fetch professors and lectures without Provadis", 500));
  }
};
