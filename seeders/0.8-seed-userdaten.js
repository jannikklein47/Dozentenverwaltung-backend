"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert(
      "User",
      [
        {
          username: "admin_provadis",
          password: "hashed_password_123", // In Produktion: bcrypt hash
          role: "Admin",
          createdAt: now,
          updatedAt: now,
        },
        {
          username: "dozent_mueller",
          password: "hashed_password_456",
          role: "Dozent",
          createdAt: now,
          updatedAt: now,
        },
        {
          username: "studi_max",
          password: "hashed_password_789",
          role: "Student",
          createdAt: now,
          updatedAt: now,
        },
        {
          username: "studi_julia",
          password: "hashed_password_abc",
          role: "Student",
          createdAt: now,
          updatedAt: now,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    // Löscht alle Einträge aus der User-Tabelle beim Rollback
    await queryInterface.bulkDelete("User", null, {});
  },
};