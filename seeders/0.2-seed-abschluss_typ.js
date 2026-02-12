"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert(
      "Abschluss_Typ",
      [
        { name: "Bachelor", createdAt: now, updatedAt: now },
        { name: "Master", createdAt: now, updatedAt: now },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Abschluss_Typ", null, {});
  },
};
