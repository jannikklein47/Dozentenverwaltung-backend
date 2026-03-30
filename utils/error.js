class APIError extends Error {
  constructor(
    title = "Unbekannter Fehler",
    message = "Bitte versuche es später erneut oder melde dieses Problem.",
    code = 500,
  ) {
    super();
    this.name = this.constructor.name;
    ((this.title = title), (this.message = message));
    this.statusCode = code;
    this.success = false;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }

  static errorUnauthorized() {
    return new APIError(
      "Die angefragte Resource ist geschützt.",
      "Bitte melde dich an.",
      401,
    );
  }

  static errorTokenMalformed() {
    return new APIError(
      "Authentisierung fehlgeschlagen",
      "Ungültiges Token. Bitte melde dich erneut an.",
      401,
    );
  }

  static errorTokenMissing() {
    return new APIError(
      "Authentisierung fehlgeschlagen",
      "Token fehlt. Bitte melde dich erneut an.",
      401,
    );
  }

  static errorOneTimePassword() {
    return new APIError(
      "Das ist ein Einmalpasswort",
      "Bitte ändere dein Passwort.",
      401,
    );
  }

  static errorForbidden() {
    return new APIError(
      "Die angefragte Resource ist geschützt",
      "Du hast nicht die notwendigen Berechtigungen.",
      403,
    );
  }

  static errorSessionExpired() {
    return new APIError("Sitzung abgelaufen", "Bitte melde dich neu an.", 403);
  }

  static errorNotFound() {
    return new APIError(
      "Die angefragte Resource konnte nicht gefunden werden",
      "Kontrolliere deine Anfrage.",
      404,
    );
  }

  static errorUserNotFound() {
    return new APIError(
      "Nutzer nicht gefunden",
      "Wir konnten diesen Nutzer nicht finden. Überprüfe deine Anfrage.",
      404,
    );
  }

  static errorSetVirtualNotAllowed(field) {
    return new APIError(
      "Setting a Virtual is not allowed",
      `Setting the value of the Virtual ${field} is not allowed.`,
      405,
    );
  }

  static errorUserAlreadyExists() {
    return new APIError(
      "Nutzer existiert bereits",
      "Wenn du dein Passwort vergessen hast, kontaktiere einen Administrator.",
      409,
    );
  }

  static errorRessourceAlreadyExists() {
    return new APIError(
      "Resource existiert bereits",
      "Bitte wähle andere Werte.",
      409,
    );
  }

  static errorTooManyLoginAttempts() {
    return new APIError(
      "Zu viele fehlgeschlagene Loginversuche",
      "Zugang blockiert. Bitte setze dein Passwort zurück.",
      422,
    );
  }

  static errorWrongCredentials() {
    return new APIError(
      "Falsche Anmeldedaten",
      "Email oder Passwort sind falsch.",
      403,
    );
  }

  static errorUserIsDisabled() {
    return new APIError(
      "Konto gesperrt",
      "Bitte kontaktiere einen Administrator.",
      403,
    );
  }

  static errorUnsafePassword() {
    return new APIError(
      "Passwort ist zu schwach",
      "Bitte beachte die Passwortregeln: mindestens 12 Zeichen und mindestens 1 Zeichen aus den folgenden Kategorien: Kleinbuchstaben, Großbuchstaben, Ziffern, Sonderzeichen.",
      422,
    );
  }

  static errorPasswordAlreadyUsed() {
    return new APIError(
      "Passwort bereits verwendet",
      "Wähle ein unbenutzes Passwort.",
      422,
    );
  }

  static errorValidation(message) {
    return new APIError("Validierungsfehler", message, 422);
  }

  static errorUnknown() {
    return new APIError(
      "Unbekannter Fehler",
      "Bitte versuche es später erneut oder melde dieses Problem.",
      500,
    );
  }

  static errorBadRequest(message) {
    return new APIError("Fehlerhafte Anfrage", message, 400);
  }

  static errorInitialPassword() {
    return new APIError(
      "Initial Password",
      "Initial Passwort muss geändert werden",
      403,
    );
  }
}

module.exports = APIError;
