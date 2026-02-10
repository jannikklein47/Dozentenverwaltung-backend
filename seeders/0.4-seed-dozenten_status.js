"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert(
      "Dozenten_Status",
      [
        { name: "Intern", createdAt: now, updatedAt: now },
        { name: "Extern", createdAt: now, updatedAt: now },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Dozenten_Status", null, {});
  },
};
