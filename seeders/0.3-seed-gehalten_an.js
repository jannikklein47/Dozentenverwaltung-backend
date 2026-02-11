"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert(
      "gehalten_an",
      [
        { name: "Provadis", createdAt: now, updatedAt: now },
        { name: "Extern", createdAt: now, updatedAt: now },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("gehalten_an", null, {});
  },
};
