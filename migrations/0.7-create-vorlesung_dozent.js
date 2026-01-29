"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Vorlesung_Dozent", {
      vorlesungId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Vorlesung",
          key: "id",
        },
      },
      dozentId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Dozent",
          key: "id",
        },
      },
      gehalten_anId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Gehalten_An",
          key: "id",
        },
      },
      vorliebeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Vorliebe",
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
    await queryInterface.dropTable("Vorlesung_Dozent");
  },
};
