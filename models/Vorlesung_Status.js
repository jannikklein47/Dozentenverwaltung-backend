"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vorlesung_Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vorlesung_Status.hasMany(models.Vorlesung, {
        foreignKey: "vorlesung_statusId",
        type: DataTypes.INTEGER,
      });
    }
  }
  Vorlesung_Status.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vorlesung_Status",
    },
  );
  return Vorlesung_Status;
};
