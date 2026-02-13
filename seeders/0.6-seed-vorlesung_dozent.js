"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    // WICHTIG: Diese Relationen gehen davon aus, dass die Dozenten IDs 1-27
    // und die Vorlesungen IDs 1-150 haben (durch frisches Einspielen).

    await queryInterface.bulkInsert("Vorlesung_Dozent", [
      // --- DOZENT 1: Prof. Müller (Allrounder) ---
      {
        vorlesungId: 1,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Einführung Info
      {
        vorlesungId: 5,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: 2,
        createdAt: now,
        updatedAt: now,
      }, // BWL Grundlagen
      {
        vorlesungId: 8,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // PM Grundlagen
      {
        vorlesungId: 102,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: 1,
        createdAt: now,
        updatedAt: now,
      }, // Strategisches IT Mgmt (Master)
      {
        vorlesungId: 139,
        dozentId: 1,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Innovation Mgmt

      // --- DOZENT 2: Prof. Schmidt (Bachelor Fokus) ---
      {
        vorlesungId: 2,
        dozentId: 2,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Prog I Java
      {
        vorlesungId: 11,
        dozentId: 2,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Prog II C++
      {
        vorlesungId: 26,
        dozentId: 2,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Software Eng I
      {
        vorlesungId: 46,
        dozentId: 2,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Software Eng II
      {
        vorlesungId: 13,
        dozentId: 2,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Mathe II (Extern gemacht)

      // --- DOZENT 3: Dr. Weber (Master / AI Fokus) ---
      {
        vorlesungId: 104,
        dozentId: 3,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Machine Learning I
      {
        vorlesungId: 126,
        dozentId: 3,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Machine Learning II
      {
        vorlesungId: 127,
        dozentId: 3,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Deep Learning
      {
        vorlesungId: 56,
        dozentId: 3,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Einführung KI (Bachelor)
      {
        vorlesungId: 123,
        dozentId: 3,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Computer Vision (Extern)

      // --- DOZENT 4: Prof. Klein (Allrounder / Security) ---
      {
        vorlesungId: 33,
        dozentId: 4,
        gehalten_anId: 1,
        vorliebeId: 2,
        createdAt: now,
        updatedAt: now,
      }, // IT-Sec Grund (Bach)
      {
        vorlesungId: 106,
        dozentId: 4,
        gehalten_anId: 1,
        vorliebeId: 1,
        createdAt: now,
        updatedAt: now,
      }, // Adv IT-Sec (Master)
      {
        vorlesungId: 128,
        dozentId: 4,
        gehalten_anId: 1,
        vorliebeId: 1,
        createdAt: now,
        updatedAt: now,
      }, // Cyber Sec Ops
      {
        vorlesungId: 43,
        dozentId: 4,
        gehalten_anId: 2,
        vorliebeId: 2,
        createdAt: now,
        updatedAt: now,
      }, // Kryptographie

      // --- DOZENT 5: Prof. Wagner (Bachelor / Networks) ---
      {
        vorlesungId: 28,
        dozentId: 5,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Rechnernetze I
      {
        vorlesungId: 48,
        dozentId: 5,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Rechnernetze II
      {
        vorlesungId: 15,
        dozentId: 5,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Datenbanken I
      {
        vorlesungId: 27,
        dozentId: 5,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Datenbanken II

      // --- DOZENT 6: Monika Becker (Allrounder / Soft Skills) ---
      {
        vorlesungId: 7,
        dozentId: 6,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Selbstmanagement
      {
        vorlesungId: 19,
        dozentId: 6,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Präsentation
      {
        vorlesungId: 25,
        dozentId: 6,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Interkulturelle Komm
      {
        vorlesungId: 98,
        dozentId: 6,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Konfliktmanagement
      {
        vorlesungId: 6,
        dozentId: 6,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Englisch I

      // --- DOZENT 7: Dr. Schulz (Master / Theory) ---
      {
        vorlesungId: 31,
        dozentId: 7,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Theoretische Inf
      {
        vorlesungId: 40,
        dozentId: 7,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Logik
      {
        vorlesungId: 112,
        dozentId: 7,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Distributed Algo
      {
        vorlesungId: 133,
        dozentId: 7,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Quantum Computing

      // --- DOZENT 8: Prof. Hoffmann (Web / Design) ---
      {
        vorlesungId: 20,
        dozentId: 8,
        gehalten_anId: 1,
        vorliebeId: 2,
        createdAt: now,
        updatedAt: now,
      }, // Web-Design
      {
        vorlesungId: 29,
        dozentId: 8,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Web-Prog JS
      {
        vorlesungId: 50,
        dozentId: 8,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Frontend React
      {
        vorlesungId: 81,
        dozentId: 8,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // UX Design
      {
        vorlesungId: 82,
        dozentId: 8,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // UI Design

      // --- DOZENT 9: Prof. Koch (Bachelor / Tech) ---
      {
        vorlesungId: 4,
        dozentId: 9,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Tech Inf I
      {
        vorlesungId: 16,
        dozentId: 9,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Rechnerarchitektur
      {
        vorlesungId: 23,
        dozentId: 9,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Elektrotechnik
      {
        vorlesungId: 62,
        dozentId: 9,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Embedded Systems

      // --- DOZENT 10: Julia Richter (Allrounder / Business) ---
      {
        vorlesungId: 18,
        dozentId: 10,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // KLR
      {
        vorlesungId: 35,
        dozentId: 10,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Marketing
      {
        vorlesungId: 36,
        dozentId: 10,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Personal
      {
        vorlesungId: 108,
        dozentId: 10,
        gehalten_anId: 1,
        vorliebeId: 1,
        createdAt: now,
        updatedAt: now,
      }, // IT Governance

      // --- EXTERNE DOZENTEN (ID 11-20) ---

      // Tim Bauer (Mobile)
      {
        vorlesungId: 74,
        dozentId: 11,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Android
      {
        vorlesungId: 75,
        dozentId: 11,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // iOS
      {
        vorlesungId: 42,
        dozentId: 11,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Mobile Devices

      // Carolin Wolf (Data)
      {
        vorlesungId: 55,
        dozentId: 12,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Big Data Grund
      {
        vorlesungId: 103,
        dozentId: 12,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Data Science
      {
        vorlesungId: 116,
        dozentId: 12,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Business Intelligence

      // Jan Schröder (Consulting)
      {
        vorlesungId: 85,
        dozentId: 13,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // IT Consulting
      {
        vorlesungId: 86,
        dozentId: 13,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Geschäftsprozesse
      {
        vorlesungId: 141,
        dozentId: 13,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Agile Leadership

      // Dr. Neumann (Recht)
      {
        vorlesungId: 10,
        dozentId: 14,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Recht Grund
      {
        vorlesungId: 24,
        dozentId: 14,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Datenschutz
      {
        vorlesungId: 100,
        dozentId: 14,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // IT-Recht Vertiefung

      // Markus Schwarz (Bank/Finance)
      {
        vorlesungId: 53,
        dozentId: 15,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Investition
      {
        vorlesungId: 52,
        dozentId: 15,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // IT-Controlling
      {
        vorlesungId: 129,
        dozentId: 15,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Blockchain

      // Sandra Zimmermann (Startups)
      {
        vorlesungId: 97,
        dozentId: 16,
        gehalten_anId: 1,
        vorliebeId: 2,
        createdAt: now,
        updatedAt: now,
      }, // Existenzgründung
      {
        vorlesungId: 109,
        dozentId: 16,
        gehalten_anId: 1,
        vorliebeId: 1,
        createdAt: now,
        updatedAt: now,
      }, // Digital Transformation

      // Patrick Krüger (Security Spezi)
      {
        vorlesungId: 63,
        dozentId: 17,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // IT Forensik
      {
        vorlesungId: 106,
        dozentId: 17,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Adv IT Sec

      // Lisa Hofmann (Design)
      {
        vorlesungId: 69,
        dozentId: 18,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Medieninformatik
      {
        vorlesungId: 60,
        dozentId: 18,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Computergrafik

      // Tobias Hartmann (DevOps)
      {
        vorlesungId: 142,
        dozentId: 19,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // DevOps
      {
        vorlesungId: 143,
        dozentId: 19,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Kubernetes
      {
        vorlesungId: 49,
        dozentId: 19,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Backend Node.js

      // Dr. Lange (Bio/Med)
      {
        vorlesungId: 134,
        dozentId: 20,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Bioinformatik
      {
        vorlesungId: 135,
        dozentId: 20,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Med Informatik

      // Oliver Schmitt (Games/VR)
      {
        vorlesungId: 77,
        dozentId: 21,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Game Dev
      {
        vorlesungId: 78,
        dozentId: 21,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Unity
      {
        vorlesungId: 79,
        dozentId: 21,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // VR Grund
      {
        vorlesungId: 137,
        dozentId: 21,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Adv Game Eng

      // Katrin Werner (SAP/Oracle)
      {
        vorlesungId: 87,
        dozentId: 22,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // SAP
      {
        vorlesungId: 88,
        dozentId: 22,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Oracle
      {
        vorlesungId: 44,
        dozentId: 22,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // ERP

      // Felix Krause (Cloud/High Perf)
      {
        vorlesungId: 105,
        dozentId: 23,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Cloud Arch
      {
        vorlesungId: 113,
        dozentId: 23,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // HPC
      {
        vorlesungId: 54,
        dozentId: 23,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Cloud Basic

      // Anja Meier (DevOps/Container)
      {
        vorlesungId: 90,
        dozentId: 24,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // DevOps Grund
      {
        vorlesungId: 144,
        dozentId: 24,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Microservices

      // Dr. Lehmann (Master Research)
      {
        vorlesungId: 107,
        dozentId: 25,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Forschungsmethoden
      {
        vorlesungId: 146,
        dozentId: 25,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Master Forschung I
      {
        vorlesungId: 147,
        dozentId: 25,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Master Forschung II
      {
        vorlesungId: 149,
        dozentId: 25,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Wiss. Publikationen
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Vorlesung_Dozent", null, {});
  },
};



