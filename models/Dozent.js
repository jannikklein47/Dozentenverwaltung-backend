"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dozent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dozent.belongsToMany(models.Vorlesung, {
        through: {
          model: models.Vorlesung_Dozent,
          unique: true,
        },
      });
      Dozent.belongsTo(models.Dozenten_Status, {
        foreignKey: "dozenten_statusId",
        type: DataTypes.INTEGER,
      });
      Dozent.belongsTo(models.Vorliebe, {
        foreignKey: "vorliebe",
        type: DataTypes.INTEGER,
      });
    }
  }
  Dozent.init(
    {},
    {
      sequelize,
      modelName: "Dozent",
    },
  );
  return Dozent;
};
