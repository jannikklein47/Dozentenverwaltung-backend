"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert("Vorlesung", [
      // Bachelor (abschluss_typId: 1)
      {
        name: "Grundlagen der Informatik",
        vorlesung_statusId: 2,
        abschluss_typId: 1,
        semester: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Programmierung I",
        vorlesung_statusId: 2,
        abschluss_typId: 1,
        semester: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Programmierung II",
        vorlesung_statusId: 1,
        abschluss_typId: 1,
        semester: 2,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Datenbanken",
        vorlesung_statusId: 2,
        abschluss_typId: 1,
        semester: 3,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Rechnernetze",
        vorlesung_statusId: 2,
        abschluss_typId: 1,
        semester: 4,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Software Engineering",
        vorlesung_statusId: 2,
        abschluss_typId: 1,
        semester: 4,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Mathematik I",
        vorlesung_statusId: 2,
        abschluss_typId: 1,
        semester: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Mathematik II",
        vorlesung_statusId: 2,
        abschluss_typId: 1,
        semester: 2,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Algorithmen und Datenstrukturen",
        vorlesung_statusId: 2,
        abschluss_typId: 1,
        semester: 3,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Betriebssysteme",
        vorlesung_statusId: 2,
        abschluss_typId: 1,
        semester: 4,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Web-Entwicklung",
        vorlesung_statusId: 2,
        abschluss_typId: 1,
        semester: 5,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "IT-Sicherheit",
        vorlesung_statusId: 1,
        abschluss_typId: 1,
        semester: 5,
        createdAt: now,
        updatedAt: now,
      },

      // Master (abschluss_typId: 2)
      {
        name: "Advanced AI Systems",
        vorlesung_statusId: 2,
        abschluss_typId: 2,
        semester: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "IT-Architektur Management",
        vorlesung_statusId: 2,
        abschluss_typId: 2,
        semester: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Cloud Computing",
        vorlesung_statusId: 2,
        abschluss_typId: 2,
        semester: 2,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Data Science",
        vorlesung_statusId: 2,
        abschluss_typId: 2,
        semester: 2,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Machine Learning",
        vorlesung_statusId: 1,
        abschluss_typId: 2,
        semester: 3,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Big Data Technologies",
        vorlesung_statusId: 2,
        abschluss_typId: 2,
        semester: 3,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Mobile Computing",
        vorlesung_statusId: 2,
        abschluss_typId: 2,
        semester: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Kryptographie",
        vorlesung_statusId: 2,
        abschluss_typId: 2,
        semester: 2,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "IT-Consulting",
        vorlesung_statusId: 2,
        abschluss_typId: 2,
        semester: 3,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("vorlesung", null, {});
  },
};

