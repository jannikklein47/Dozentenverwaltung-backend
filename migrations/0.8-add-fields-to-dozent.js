"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Dozent", "titel", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Dozent", "name", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Dozent", "vorname", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Dozent", "email", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Dozent", "telefonnummer", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Dozent", "vorliebeId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Vorliebe",
        key: "id",
      },
    });

    await queryInterface.addColumn("Dozent", "prio_bachelor", {
      type: Sequelize.TINYINT,
      allowNull: true,
    });

    await queryInterface.addColumn("Dozent", "prio_master", {
      type: Sequelize.TINYINT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    // reverse order to be safe
    await queryInterface.removeColumn("Dozent", "prio_master");
    await queryInterface.removeColumn("Dozent", "prio_bachelor");
    await queryInterface.removeColumn("Dozent", "vorliebeId");
    await queryInterface.removeColumn("Dozent", "telefonnummer");
    await queryInterface.removeColumn("Dozent", "email");
    await queryInterface.removeColumn("Dozent", "vorname");
    await queryInterface.removeColumn("Dozent", "name");
    await queryInterface.removeColumn("Dozent", "titel");
  },
};

