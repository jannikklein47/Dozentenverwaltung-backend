"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gehalten_An extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Gehalten_An.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Gehalten_An",
    },
  );
  return Gehalten_An;
};
