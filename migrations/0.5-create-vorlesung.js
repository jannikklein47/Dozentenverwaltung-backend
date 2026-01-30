"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Vorlesung", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      semester: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      abschluss_typId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Abschluss_Typ",
          key: "id",
        },
      },
      vorlesung_statusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Vorlesung_Status",
          key: "id",
        },
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
    await queryInterface.dropTable("Vorlesung");
  },
};
