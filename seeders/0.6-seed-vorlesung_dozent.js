"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // WICHTIG: Diese Relationen gehen davon aus, dass die Dozenten IDs 1-27
    // und die Vorlesungen IDs 1-150 haben (durch frisches Einspielen).

    await queryInterface.bulkInsert("Vorlesung_Dozenten", [
      // --- DOZENT 1: Prof. Müller (Allrounder) ---
      {
        VorlesungID: 1,
        DozentenID: 1,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Einführung Info
      {
        VorlesungID: 5,
        DozentenID: 1,
        gehalten_anID: 1,
        VorliebeID: 2,
        createdAt: now,
        updatedAt: now,
      }, // BWL Grundlagen
      {
        VorlesungID: 8,
        DozentenID: 1,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // PM Grundlagen
      {
        VorlesungID: 102,
        DozentenID: 1,
        gehalten_anID: 1,
        VorliebeID: 1,
        createdAt: now,
        updatedAt: now,
      }, // Strategisches IT Mgmt (Master)
      {
        VorlesungID: 139,
        DozentenID: 1,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Innovation Mgmt

      // --- DOZENT 2: Prof. Schmidt (Bachelor Fokus) ---
      {
        VorlesungID: 2,
        DozentenID: 2,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Prog I Java
      {
        VorlesungID: 11,
        DozentenID: 2,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Prog II C++
      {
        VorlesungID: 26,
        DozentenID: 2,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Software Eng I
      {
        VorlesungID: 46,
        DozentenID: 2,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Software Eng II
      {
        VorlesungID: 13,
        DozentenID: 2,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Mathe II (Extern gemacht)

      // --- DOZENT 3: Dr. Weber (Master / AI Fokus) ---
      {
        VorlesungID: 104,
        DozentenID: 3,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Machine Learning I
      {
        VorlesungID: 126,
        DozentenID: 3,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Machine Learning II
      {
        VorlesungID: 127,
        DozentenID: 3,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Deep Learning
      {
        VorlesungID: 56,
        DozentenID: 3,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Einführung KI (Bachelor)
      {
        VorlesungID: 123,
        DozentenID: 3,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Computer Vision (Extern)

      // --- DOZENT 4: Prof. Klein (Allrounder / Security) ---
      {
        VorlesungID: 33,
        DozentenID: 4,
        gehalten_anID: 1,
        VorliebeID: 2,
        createdAt: now,
        updatedAt: now,
      }, // IT-Sec Grund (Bach)
      {
        VorlesungID: 106,
        DozentenID: 4,
        gehalten_anID: 1,
        VorliebeID: 1,
        createdAt: now,
        updatedAt: now,
      }, // Adv IT-Sec (Master)
      {
        VorlesungID: 128,
        DozentenID: 4,
        gehalten_anID: 1,
        VorliebeID: 1,
        createdAt: now,
        updatedAt: now,
      }, // Cyber Sec Ops
      {
        VorlesungID: 43,
        DozentenID: 4,
        gehalten_anID: 2,
        VorliebeID: 2,
        createdAt: now,
        updatedAt: now,
      }, // Kryptographie

      // --- DOZENT 5: Prof. Wagner (Bachelor / Networks) ---
      {
        VorlesungID: 28,
        DozentenID: 5,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Rechnernetze I
      {
        VorlesungID: 48,
        DozentenID: 5,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Rechnernetze II
      {
        VorlesungID: 15,
        DozentenID: 5,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Datenbanken I
      {
        VorlesungID: 27,
        DozentenID: 5,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Datenbanken II

      // --- DOZENT 6: Monika Becker (Allrounder / Soft Skills) ---
      {
        VorlesungID: 7,
        DozentenID: 6,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Selbstmanagement
      {
        VorlesungID: 19,
        DozentenID: 6,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Präsentation
      {
        VorlesungID: 25,
        DozentenID: 6,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Interkulturelle Komm
      {
        VorlesungID: 98,
        DozentenID: 6,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Konfliktmanagement
      {
        VorlesungID: 6,
        DozentenID: 6,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Englisch I

      // --- DOZENT 7: Dr. Schulz (Master / Theory) ---
      {
        VorlesungID: 31,
        DozentenID: 7,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Theoretische Inf
      {
        VorlesungID: 40,
        DozentenID: 7,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Logik
      {
        VorlesungID: 112,
        DozentenID: 7,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Distributed Algo
      {
        VorlesungID: 133,
        DozentenID: 7,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Quantum Computing

      // --- DOZENT 8: Prof. Hoffmann (Web / Design) ---
      {
        VorlesungID: 20,
        DozentenID: 8,
        gehalten_anID: 1,
        VorliebeID: 2,
        createdAt: now,
        updatedAt: now,
      }, // Web-Design
      {
        VorlesungID: 29,
        DozentenID: 8,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Web-Prog JS
      {
        VorlesungID: 50,
        DozentenID: 8,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Frontend React
      {
        VorlesungID: 81,
        DozentenID: 8,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // UX Design
      {
        VorlesungID: 82,
        DozentenID: 8,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // UI Design

      // --- DOZENT 9: Prof. Koch (Bachelor / Tech) ---
      {
        VorlesungID: 4,
        DozentenID: 9,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Tech Inf I
      {
        VorlesungID: 16,
        DozentenID: 9,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Rechnerarchitektur
      {
        VorlesungID: 23,
        DozentenID: 9,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Elektrotechnik
      {
        VorlesungID: 62,
        DozentenID: 9,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Embedded Systems

      // --- DOZENT 10: Julia Richter (Allrounder / Business) ---
      {
        VorlesungID: 18,
        DozentenID: 10,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // KLR
      {
        VorlesungID: 35,
        DozentenID: 10,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Marketing
      {
        VorlesungID: 36,
        DozentenID: 10,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Personal
      {
        VorlesungID: 108,
        DozentenID: 10,
        gehalten_anID: 1,
        VorliebeID: 1,
        createdAt: now,
        updatedAt: now,
      }, // IT Governance

      // --- EXTERNE DOZENTEN (ID 11-20) ---

      // Tim Bauer (Mobile)
      {
        VorlesungID: 74,
        DozentenID: 11,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Android
      {
        VorlesungID: 75,
        DozentenID: 11,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // iOS
      {
        VorlesungID: 42,
        DozentenID: 11,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Mobile Devices

      // Carolin Wolf (Data)
      {
        VorlesungID: 55,
        DozentenID: 12,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Big Data Grund
      {
        VorlesungID: 103,
        DozentenID: 12,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Data Science
      {
        VorlesungID: 116,
        DozentenID: 12,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Business Intelligence

      // Jan Schröder (Consulting)
      {
        VorlesungID: 85,
        DozentenID: 13,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // IT Consulting
      {
        VorlesungID: 86,
        DozentenID: 13,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Geschäftsprozesse
      {
        VorlesungID: 141,
        DozentenID: 13,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Agile Leadership

      // Dr. Neumann (Recht)
      {
        VorlesungID: 10,
        DozentenID: 14,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Recht Grund
      {
        VorlesungID: 24,
        DozentenID: 14,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Datenschutz
      {
        VorlesungID: 100,
        DozentenID: 14,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // IT-Recht Vertiefung

      // Markus Schwarz (Bank/Finance)
      {
        VorlesungID: 53,
        DozentenID: 15,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Investition
      {
        VorlesungID: 52,
        DozentenID: 15,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // IT-Controlling
      {
        VorlesungID: 129,
        DozentenID: 15,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Blockchain

      // Sandra Zimmermann (Startups)
      {
        VorlesungID: 97,
        DozentenID: 16,
        gehalten_anID: 1,
        VorliebeID: 2,
        createdAt: now,
        updatedAt: now,
      }, // Existenzgründung
      {
        VorlesungID: 109,
        DozentenID: 16,
        gehalten_anID: 1,
        VorliebeID: 1,
        createdAt: now,
        updatedAt: now,
      }, // Digital Transformation

      // Patrick Krüger (Security Spezi)
      {
        VorlesungID: 63,
        DozentenID: 17,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // IT Forensik
      {
        VorlesungID: 106,
        DozentenID: 17,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Adv IT Sec

      // Lisa Hofmann (Design)
      {
        VorlesungID: 69,
        DozentenID: 18,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Medieninformatik
      {
        VorlesungID: 60,
        DozentenID: 18,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Computergrafik

      // Tobias Hartmann (DevOps)
      {
        VorlesungID: 142,
        DozentenID: 19,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // DevOps
      {
        VorlesungID: 143,
        DozentenID: 19,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Kubernetes
      {
        VorlesungID: 49,
        DozentenID: 19,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Backend Node.js

      // Dr. Lange (Bio/Med)
      {
        VorlesungID: 134,
        DozentenID: 20,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Bioinformatik
      {
        VorlesungID: 135,
        DozentenID: 20,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Med Informatik

      // Oliver Schmitt (Games/VR)
      {
        VorlesungID: 77,
        DozentenID: 21,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Game Dev
      {
        VorlesungID: 78,
        DozentenID: 21,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Unity
      {
        VorlesungID: 79,
        DozentenID: 21,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // VR Grund
      {
        VorlesungID: 137,
        DozentenID: 21,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Adv Game Eng

      // Katrin Werner (SAP/Oracle)
      {
        VorlesungID: 87,
        DozentenID: 22,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // SAP
      {
        VorlesungID: 88,
        DozentenID: 22,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Oracle
      {
        VorlesungID: 44,
        DozentenID: 22,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // ERP

      // Felix Krause (Cloud/High Perf)
      {
        VorlesungID: 105,
        DozentenID: 23,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Cloud Arch
      {
        VorlesungID: 113,
        DozentenID: 23,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // HPC
      {
        VorlesungID: 54,
        DozentenID: 23,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Cloud Basic

      // Anja Meier (DevOps/Container)
      {
        VorlesungID: 90,
        DozentenID: 24,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // DevOps Grund
      {
        VorlesungID: 144,
        DozentenID: 24,
        gehalten_anID: 2,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Microservices

      // Dr. Lehmann (Master Research)
      {
        VorlesungID: 107,
        DozentenID: 25,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Forschungsmethoden
      {
        VorlesungID: 146,
        DozentenID: 25,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Master Forschung I
      {
        VorlesungID: 147,
        DozentenID: 25,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Master Forschung II
      {
        VorlesungID: 149,
        DozentenID: 25,
        gehalten_anID: 1,
        VorliebeID: null,
        createdAt: now,
        updatedAt: now,
      }, // Wiss. Publikationen
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Vorlesung_Dozenten", null, {});
  },
};
