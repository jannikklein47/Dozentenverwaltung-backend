"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Userdaten", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Usernames sollten eindeutig sein
      },
      passwort: {
        type: Sequelize.STRING,
        allowNull: false, // Hier speichern wir später den Hash
      },
      rolle: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Admin", // Standardrolle, falls nichts angegeben wird
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Userdaten");
  },
};