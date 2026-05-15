"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Vorlesung_Dozent", "vorliebeId");
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Vorlesung_Dozent", "vorliebeId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
