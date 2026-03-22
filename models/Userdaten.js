"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Verhindert doppelte Benutzernamen
      },
      passwort: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rolle: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Admin", // Standardwert
      },
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true, // Verhindert, dass Sequelize "Users" daraus macht
      tableName: "Userdaten",
    }
  );

  return User;
};