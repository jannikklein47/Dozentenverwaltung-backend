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
      // -- Grundlagen Informatik (Mehrfachbelegung durch diverse Profs) --
      {
        vorlesungId: 1,
        dozentId: 2,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schmidt hilft bei Einführung
      {
        vorlesungId: 1,
        dozentId: 9,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Koch hilft auch

      {
        vorlesungId: 2,
        dozentId: 9,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Koch macht auch Java
      {
        vorlesungId: 2,
        dozentId: 24,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Meier (Extern) macht Java Praxis
      {
        vorlesungId: 11,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Müller macht auch C++
      {
        vorlesungId: 11,
        dozentId: 21,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schmitt (Extern) C++ Gaming Fokus

      {
        vorlesungId: 3,
        dozentId: 2,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schmidt macht Mathe I
      {
        vorlesungId: 3,
        dozentId: 7,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schulz (Theoretiker) macht Mathe I
      {
        vorlesungId: 14,
        dozentId: 7,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schulz macht Statistik
      {
        vorlesungId: 13,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Müller springt für Mathe II ein

      {
        vorlesungId: 5,
        dozentId: 10,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Richter macht BWL
      {
        vorlesungId: 5,
        dozentId: 15,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schwarz (Banker) macht BWL Extern
      {
        vorlesungId: 18,
        dozentId: 15,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schwarz macht KLR
      {
        vorlesungId: 35,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: 2,
        createdAt: now,
        updatedAt: now,
      }, // Müller macht Marketing (Bachelor Pref)

      {
        vorlesungId: 6,
        dozentId: 16,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Zimmermann macht Englisch I
      {
        vorlesungId: 17,
        dozentId: 6,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Becker macht Englisch II
      {
        vorlesungId: 17,
        dozentId: 16,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Zimmermann macht Englisch II
      {
        vorlesungId: 7,
        dozentId: 10,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Richter macht Selbstmanagement

      {
        vorlesungId: 10,
        dozentId: 4,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Klein (Sec) macht Recht
      {
        vorlesungId: 24,
        dozentId: 4,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Klein macht Datenschutz
      {
        vorlesungId: 96,
        dozentId: 14,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Neumann macht IT-Recht Vertiefung

      {
        vorlesungId: 15,
        dozentId: 22,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Werner (Oracle Expertin) macht DB1
      {
        vorlesungId: 27,
        dozentId: 22,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Werner macht DB2 (NoSQL)
      {
        vorlesungId: 27,
        dozentId: 8,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Hoffmann (Web) macht DB2

      {
        vorlesungId: 20,
        dozentId: 21,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schmitt (Game/Design) macht WebDesign
      {
        vorlesungId: 29,
        dozentId: 24,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Meier macht JS
      {
        vorlesungId: 49,
        dozentId: 8,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Hoffmann macht Node.js
      {
        vorlesungId: 50,
        dozentId: 24,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Meier macht React

      {
        vorlesungId: 33,
        dozentId: 17,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Krüger macht IT-Sec Grund
      {
        vorlesungId: 43,
        dozentId: 17,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Krüger macht Crypto
      {
        vorlesungId: 128,
        dozentId: 17,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Krüger macht Cyber Ops
      {
        vorlesungId: 63,
        dozentId: 4,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Klein macht Forensik

      {
        vorlesungId: 28,
        dozentId: 19,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Hartmann (DevOps) macht Netze
      {
        vorlesungId: 41,
        dozentId: 5,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Wagner macht Server Admin
      {
        vorlesungId: 41,
        dozentId: 19,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Hartmann macht Server Admin

      {
        vorlesungId: 26,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Müller SE1
      {
        vorlesungId: 46,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Müller SE2
      {
        vorlesungId: 57,
        dozentId: 24,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Meier macht QS
      {
        vorlesungId: 58,
        dozentId: 13,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schröder (Consultant) macht Scrum
      {
        vorlesungId: 59,
        dozentId: 13,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schröder macht Requirements

      {
        vorlesungId: 55,
        dozentId: 3,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Weber macht Big Data
      {
        vorlesungId: 56,
        dozentId: 12,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Wolf macht AI Intro
      {
        vorlesungId: 104,
        dozentId: 12,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Wolf macht ML1
      {
        vorlesungId: 116,
        dozentId: 3,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Weber macht BI

      {
        vorlesungId: 74,
        dozentId: 21,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schmitt macht Android (Game focus)
      {
        vorlesungId: 75,
        dozentId: 24,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Meier macht iOS
      {
        vorlesungId: 76,
        dozentId: 11,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Bauer macht Cross-Platform
      {
        vorlesungId: 77,
        dozentId: 11,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Bauer macht Game Dev

      {
        vorlesungId: 101,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: 1,
        createdAt: now,
        updatedAt: now,
      }, // Müller Adv Arch
      {
        vorlesungId: 101,
        dozentId: 23,
        gehalten_anId: 1,
        vorliebeId: 1,
        createdAt: now,
        updatedAt: now,
      }, // Krause Adv Arch
      {
        vorlesungId: 105,
        dozentId: 19,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Hartmann Cloud Arch
      {
        vorlesungId: 110,
        dozentId: 23,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Krause Enterprise Arch
      {
        vorlesungId: 117,
        dozentId: 13,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schröder ITSM

      {
        vorlesungId: 71,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Praxisprojekt 1 Müller
      {
        vorlesungId: 71,
        dozentId: 2,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Praxisprojekt 1 Schmidt
      {
        vorlesungId: 71,
        dozentId: 8,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Praxisprojekt 1 Hoffmann
      {
        vorlesungId: 72,
        dozentId: 3,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Praxisprojekt 2 Weber
      {
        vorlesungId: 72,
        dozentId: 4,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Praxisprojekt 2 Klein
      {
        vorlesungId: 72,
        dozentId: 5,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Praxisprojekt 2 Wagner
      {
        vorlesungId: 73,
        dozentId: 6,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Bachelor Seminar Becker
      {
        vorlesungId: 73,
        dozentId: 7,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Bachelor Seminar Schulz
      {
        vorlesungId: 95,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Bachelor Kolloquium Müller
      {
        vorlesungId: 95,
        dozentId: 10,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Bachelor Kolloquium Richter

      {
        vorlesungId: 146,
        dozentId: 8,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Lehmann Forschung I
      {
        vorlesungId: 146,
        dozentId: 3,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Weber Forschung I
      {
        vorlesungId: 147,
        dozentId: 10,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Lehmann Forschung II
      {
        vorlesungId: 147,
        dozentId: 7,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schulz Forschung II
      {
        vorlesungId: 148,
        dozentId: 25,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Master Kolloquium Lehmann
      {
        vorlesungId: 148,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Master Kolloquium Müller

      {
        vorlesungId: 12,
        dozentId: 2,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schmidt Algo
      {
        vorlesungId: 12,
        dozentId: 7,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schulz Algo
      {
        vorlesungId: 22,
        dozentId: 5,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Wagner SE Prozesse
      {
        vorlesungId: 30,
        dozentId: 5,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Wagner OS Windows
      {
        vorlesungId: 32,
        dozentId: 8,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Hoffmann HCI
      {
        vorlesungId: 32,
        dozentId: 18,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Hofmann (Design) HCI
      {
        vorlesungId: 34,
        dozentId: 16,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Zimmermann WINF
      {
        vorlesungId: 37,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: 1,
        createdAt: now,
        updatedAt: now,
      }, // Müller OOAD
      {
        vorlesungId: 38,
        dozentId: 12,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Wolf Python
      {
        vorlesungId: 39,
        dozentId: 19,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Hartmann Netzmgmt
      {
        vorlesungId: 47,
        dozentId: 23,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Krause Verteilte Sys
      {
        vorlesungId: 51,
        dozentId: 7,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schulz Compiler
      {
        vorlesungId: 61,
        dozentId: 9,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Koch Embedded
      {
        vorlesungId: 64,
        dozentId: 10,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Richter Wissenmgmt
      {
        vorlesungId: 65,
        dozentId: 14,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Neumann Ethik
      {
        vorlesungId: 66,
        dozentId: 23,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Krause Green IT
      {
        vorlesungId: 67,
        dozentId: 10,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Richter CRM
      {
        vorlesungId: 68,
        dozentId: 10,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Richter SCM
      {
        vorlesungId: 70,
        dozentId: 22,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Werner E-Business
      {
        vorlesungId: 80,
        dozentId: 21,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schmitt AR
      {
        vorlesungId: 83,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Müller Digital Marketing
      {
        vorlesungId: 84,
        dozentId: 8,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Hoffmann Social Media
      {
        vorlesungId: 89,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Müller SWA
      {
        vorlesungId: 91,
        dozentId: 24,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Meier DevOps
      {
        vorlesungId: 99,
        dozentId: 25,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Lehmann TA
      {
        vorlesungId: 100,
        dozentId: 20,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Lange Robotik
      {
        vorlesungId: 101,
        dozentId: 24,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Krause Auto Tech
      {
        vorlesungId: 102,
        dozentId: 9,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Koch IoT Basic
      {
        vorlesungId: 103,
        dozentId: 9,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Koch Smart Home
      {
        vorlesungId: 109,
        dozentId: 1,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Müller Digital Trans
      {
        vorlesungId: 111,
        dozentId: 22,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Werner Adv DB
      {
        vorlesungId: 112,
        dozentId: 23,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Krause Dist Algo
      {
        vorlesungId: 113,
        dozentId: 19,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Krause HPC
      {
        vorlesungId: 114,
        dozentId: 11,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Bauer Mob Adv
      {
        vorlesungId: 115,
        dozentId: 8,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Hoffmann HCI Adv
      {
        vorlesungId: 118,
        dozentId: 13,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schröder Leadership
      {
        vorlesungId: 119,
        dozentId: 13,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schröder Int PM
      {
        vorlesungId: 120,
        dozentId: 7,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schulz Paradigm
      {
        vorlesungId: 121,
        dozentId: 12,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Wolf IR
      {
        vorlesungId: 122,
        dozentId: 12,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Wolf Semantic Web
      {
        vorlesungId: 124,
        dozentId: 3,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Weber NLP
      {
        vorlesungId: 125,
        dozentId: 3,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Weber Pat Rec
      {
        vorlesungId: 130,
        dozentId: 23,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Krause Smart Contracts
      {
        vorlesungId: 131,
        dozentId: 9,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Koch IoT2
      {
        vorlesungId: 132,
        dozentId: 9,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Koch IIoT
      {
        vorlesungId: 136,
        dozentId: 21,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schmitt Game2
      {
        vorlesungId: 138,
        dozentId: 16,
        gehalten_anId: 1,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Zimmermann Change
      {
        vorlesungId: 140,
        dozentId: 13,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Schröder Agile Adv
      {
        vorlesungId: 145,
        dozentId: 24,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Meier Serverless
      {
        vorlesungId: 150,
        dozentId: 12,
        gehalten_anId: 2,
        vorliebeId: null,
        createdAt: now,
        updatedAt: now,
      }, // Wolf Future Tech
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Vorlesung_Dozent", null, {});
  },
};
