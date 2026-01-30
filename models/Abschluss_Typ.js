"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Abschluss_Typ extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Abschluss_Typ.hasMany(models.Vorlesung, {
        foreignKey: "abschluss_typId",
        type: DataTypes.INTEGER,
      });
    }
  }
  Abschluss_Typ.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Abschluss_Typ",
    },
  );
  return Abschluss_Typ;
};
