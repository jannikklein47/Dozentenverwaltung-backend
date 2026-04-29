// utils/joi.messages.js

const germanMessages = {
  // --- Allgemeine Fehler ---
  "any.required": "{#label} ist ein Pflichtfeld.",
  "any.only": "{#label} muss einer der folgenden Werte sein: {#valids}",
  "any.invalid": "{#label} enthält einen ungültigen Wert.",

  // --- Strings (Texte) ---
  "string.base": "{#label} muss ein Text sein.",
  "string.empty": "{#label} darf nicht leer sein.",
  "string.min": "{#label} muss mindestens {#limit} Zeichen lang sein.",
  "string.max": "{#label} darf maximal {#limit} Zeichen lang sein.",
  "string.email": "{#label} muss eine gültige E-Mail-Adresse sein.",
  "string.hex": "{#label} darf nur im Hexadezimalformat sein.",
  "string.length": "{#label} muss genau {#limit} Zeichen lang sein.",
  "string.pattern.base": "{#label} entspricht nicht dem geforderten Format.",
  "string.pattern.name": "{#label} {#name}.", // Wichtig für deine Custom-Pattern-Namen!

  // --- Numbers (Zahlen) ---
  "number.base": "{#label} muss eine Zahl sein.",
  "number.integer": "{#label} muss eine ganze Zahl sein.",
  "number.positive": "{#label} muss eine positive Zahl sein.",
  "number.min": "{#label} muss größer oder gleich {#limit} sein.",
  "number.max": "{#label} muss kleiner oder gleich {#limit} sein.",

  // --- Arrays (Listen) ---
  "array.base": "{#label} muss eine Liste sein.",
  "array.min": "{#label} muss mindestens {#limit} Element(e) enthalten.",
};

module.exports = germanMessages;
