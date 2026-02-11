"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert(
      "vorlesung_status",
      [
        { name: "Geschlossen", createdAt: now, updatedAt: now },
        { name: "Offen", createdAt: now, updatedAt: now },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("vorlesung_status", null, {});
  },
};
