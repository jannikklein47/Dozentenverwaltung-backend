"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert(
      "abschluss_typ",
      [
        { name: "Bachelor", createdAt: now, updatedAt: now },
        { name: "Master", createdAt: now, updatedAt: now },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("abschluss_typ", null, {});
  },
};
