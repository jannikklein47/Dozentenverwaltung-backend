"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Dozent", "dozenten_statusId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Dozenten_Status",
        key: "id",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Dozent", "dozenten_statusId");
  },
};
