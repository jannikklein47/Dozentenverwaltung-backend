"use strict";
const bcrypt = require("bcryptjs");
const { func } = require("joi");

function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert(
      "User",
      [
        {
          username: "admin_provadis",
          passwort: await hashPassword("password123"),
          rolle: "Admin",
          active: true,
          initialPassword: false,
          createdAt: now,
          updatedAt: now,
        },
        {
          username: "dozent_mueller",
          passwort: await hashPassword("password456"),
          rolle: "User",
          active: true,
          initialPassword: false,
          createdAt: now,
          updatedAt: now,
        },
        {
          username: "studi_max",
          passwort: await hashPassword("password789"),
          rolle: "User",
          active: false,
          initialPassword: false,
          createdAt: now,
          updatedAt: now,
        },
        {
          username: "studi_julia",
          passwort: await hashPassword("passwordabc"),
          rolle: "User",
          active: true,
          initialPassword: true,
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
