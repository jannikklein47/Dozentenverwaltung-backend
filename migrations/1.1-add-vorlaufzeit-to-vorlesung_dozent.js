"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
async up(queryInterface, Sequelize) {
  await queryInterface.addColumn("Vorlesung_Dozent", "vorlaufzeit", {
    type: Sequelize.ENUM("S", "4", "M"),
    allowNull: false,
    defaultValue: "M",
  });
},
async down(queryInterface, Sequelize) {
    // reverse order to be safe
    await queryInterface.removeColumn("Vorlesung_Dozent", "vorlaufzeit");
  },
};
