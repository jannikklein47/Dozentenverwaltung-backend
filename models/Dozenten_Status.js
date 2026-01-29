"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dozenten_Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Dozenten_Status.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Dozenten_Status",
    },
  );
  return Dozenten_Status;
};
