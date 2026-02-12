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
        through: { model: models.Vorlesung_Dozent, unique: true },
        foreignKey: "vorlesungId",
        otherKey: "dozentId",
        as: "professors",
      });
      Vorlesung.belongsTo(models.Abschluss_Typ, {
        foreignKey: "abschluss_typId",
        as: "completionType",
      });
      Vorlesung.belongsTo(models.Vorlesung_Status, {
        foreignKey: "vorlesung_statusId",
        as: "lectureStatus",
      });
    }
  }
  Vorlesung.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vorlesung_statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      abschluss_typId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      semester: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      kuerzel: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Vorlesung",

      freezeTableName: true,
      tableName: "Vorlesung",
    },
  );
  return Vorlesung;
};
