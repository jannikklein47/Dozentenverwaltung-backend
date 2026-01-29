"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vorlesung_Dozent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vorlesung_Dozent.belongsTo(models.Gehalten_An, {
        foreignKey: "gehalten_anId",
        type: DataTypes.INTEGER,
      });
      Vorlesung_Dozent.belongsTo(models.Vorliebe, {
        foreignKey: "vorliebeId",
        type: DataTypes.INTEGER,
      });
    }
  }
  Vorlesung_Dozent.init(
    {},
    {
      sequelize,
      modelName: "Vorlesung_Dozent",
    },
  );
  return Vorlesung_Dozent;
};
