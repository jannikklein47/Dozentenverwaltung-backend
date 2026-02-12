"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert(
      "Vorliebe",
      [
        { name: "M", createdAt: now, updatedAt: now },
        { name: "B", createdAt: now, updatedAt: now },
        { name: "A", createdAt: now, updatedAt: now },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Vorliebe", null, {});
  },
};
