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
          passwort: "hashed_password_123", // In Produktion: bcrypt hash
          rolle: "Admin",
          createdAt: now,
          updatedAt: now,
        },
        {
          username: "dozent_mueller",
          passwort: "hashed_password_456",
          rolle: "Dozent",
          createdAt: now,
          updatedAt: now,
        },
        {
          username: "studi_max",
          passwort: "hashed_password_789",
          rolle: "Student",
          createdAt: now,
          updatedAt: now,
        },
        {
          username: "studi_julia",
          passwort: "hashed_password_abc",
          rolle: "Student",
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