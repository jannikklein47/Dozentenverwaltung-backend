"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const countRows = await queryInterface.sequelize.query(
      "SELECT COUNT(*) AS count FROM Gehalten_An",
      {
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    if (Number(countRows[0]?.count || 0) === 0) {
      return;
    }

    const existingRows = await queryInterface.sequelize.query(
      "SELECT id FROM Gehalten_An WHERE name = 'Noch nie gehalten' LIMIT 1",
      {
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    if (existingRows.length > 0) {
      return;
    }

    const now = new Date();

    await queryInterface.bulkInsert(
      "Gehalten_An",
      [{ name: "Noch nie gehalten", createdAt: now, updatedAt: now }],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      "Gehalten_An",
      { name: "Noch nie gehalten" },
      {},
    );
  },
};
