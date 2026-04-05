const APIError = require("../../../../utils/error");
const { Vorlesung, Dozent } = require("../../../../models");
const { Op, where } = require("sequelize");

exports.getProfessorsWithoutProvadis = async (req, res, next) => {
  try {
    const externalProfessors = await Dozent.findAll({
        include: [{
          model: Vorlesung,
          as: 'lectures',
          through: { attributes: [] },
          include: [{
            model: Gehalten_An,
            as: 'gehalten_an',
            where: {
                name: {
                    [Op.ne]: 'Provadis Hochschule'
                }
            },
            required: false
        } ]
        }],
    });
    res.status(200).json(externalProfessors);
  } catch (error) {
    next(new APIError("Failed to fetch external professors", 500));
  } 
}
