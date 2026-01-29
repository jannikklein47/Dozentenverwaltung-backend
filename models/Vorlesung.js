"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vorlesung extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vorlesung.belongsToMany(models.Dozent, {
        through: {
          model: models.Vorlesung_Dozent,
          unique: true,
        },
      });
      Vorlesung.belongsTo(models.Abschluss_Typ, {
        foreignKey: "vorlesungId",
        type: DataTypes.INTEGER,
      });
      Vorlesung.belongsTo(models.Vorlesung_Dozent, {
        foreignKey: "vorlesungId",
        type: DataTypes.INTEGER,
      });
    }
  }
  Vorlesung.init(
    {
      name: DataTypes.STRING,
      semester: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Vorlesung",
    },
  );
  return Vorlesung;
};
