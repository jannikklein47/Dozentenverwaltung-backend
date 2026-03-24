"use strict";
const bcrypt = require("bcryptjs");
const { func } = require("joi");

function hashPassword(password) {
  return bcrypt.hash(password, 14);
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert(
      "User",
      [
        {
          username: "admin",
          password: await hashPassword("geheim123"), // Nur testzwecke, ist genau das Passwort von der doku
          role: "Admin",
          active: true,
          initialPassword: false,
          createdAt: now,
          updatedAt: now,
        },
        {
          username: "admin_provadis",
          password: await hashPassword("password123"),
          role: "Admin",
          active: true,
          initialPassword: false,
          createdAt: now,
          updatedAt: now,
        },
        {
          username: "dozent_mueller",
          password: await hashPassword("password456"),
          role: "User",
          active: true,
          initialPassword: false,
          createdAt: now,
          updatedAt: now,
        },
        {
          username: "studi_max",
          password: await hashPassword("password789"),
          role: "User",
          active: false,
          initialPassword: false,
          createdAt: now,
          updatedAt: now,
        },
        {
          username: "studi_julia",
          password: await hashPassword("passwordabc"),
          role: "User",
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
