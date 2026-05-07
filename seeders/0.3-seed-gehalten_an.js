"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert(
      "Gehalten_An",
      [
        { name: "Provadis", createdAt: now, updatedAt: now },
        { name: "Extern", createdAt: now, updatedAt: now },
        { name: "Noch nie gehalten", createdAt: now, updatedAt: now },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Gehalten_An", null, {});
  },
};
