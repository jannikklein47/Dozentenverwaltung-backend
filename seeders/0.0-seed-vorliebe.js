"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert(
      "Vorliebe",
      [
        { name: "Master", createdAt: now, updatedAt: now },
        { name: "Bachelor", createdAt: now, updatedAt: now },
        { name: "Alles", createdAt: now, updatedAt: now },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Vorliebe", null, {});
  },
};
