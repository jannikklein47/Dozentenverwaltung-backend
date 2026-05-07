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
        foreignKey: "dozentId",
        otherKey: "vorlesungId",
        as: "lectures",
      });
      Dozent.belongsTo(models.Dozenten_Status, {
        foreignKey: "dozenten_statusId",
        type: DataTypes.INTEGER,
        as: "professorStatus",
      });
      Dozent.belongsTo(models.Vorliebe, {
        foreignKey: "vorliebeId",
        type: DataTypes.INTEGER,
        as: "preference",
      });
    }
  }
  Dozent.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      titel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vorname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zweiter_vorname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      telefonnummer: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      vorliebeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dozenten_statusId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      prio_bachelor: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      prio_master: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
    },

    {
      sequelize,
      modelName: "Dozent",

      freezeTableName: true,
      tableName: "Dozent",
    },
  );
  return Dozent;
};
