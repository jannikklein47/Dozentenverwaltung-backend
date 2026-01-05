class APIError extends Error {
  constructor(
    title = "Unknown Error",
    message = "Please try again at a later time or report this issue",
    code = 500
  ) {
    super();
    this.name = this.constructor.name;
    (this.title = title), (this.message = message);
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
      "The requested resource is protected",
      "Please make sure to login.",
      401
    );
  }

  static errorTokenMalformed() {
    return new APIError(
      "Authentication failed",
      "Invalid or malformed Token. Please login again.",
      401
    );
  }

  static errorTokenMissing() {
    return new APIError(
      "Authentication failed",
      "Token is missing. Please provide a Token or login again.",
      401
    );
  }

  static errorOneTimePassword() {
    return new APIError(
      "This is a One Time Password",
      "Please change your password.",
      401
    );
  }

  static errorForbidden() {
    return new APIError(
      "The requested resource is protected",
      "You have don't have the required rights.",
      403
    );
  }

  static errorSessionExpired() {
    return new APIError("Session expired", "Please login again.", 403);
  }

  static errorNotFound() {
    return new APIError(
      "The requested resource does not exist",
      "Please check your request.",
      404
    );
  }

  static errorUserNotFound() {
    return new APIError(
      "User not found",
      "Could not resolve User by Email or id. Please check your request.",
      404
    );
  }

  static errorSetVirtualNotAllowed(field) {
    return new APIError(
      "Setting a Virtual is not allowed",
      `Setting the value of the Virtual ${field} is not allowed.`,
      405
    );
  }

  static errorUserAlreadyExists() {
    return new APIError(
      "User already exists",
      "If you forgot your credentials please use the Password-Reset Service.",
      409
    );
  }

  static errorTooManyLoginAttempts() {
    return new APIError(
      "Too many failed login attempts",
      "Access is blocked. Please use the Password-Reset Service.",
      422
    );
  }

  static errorWrongCredentials() {
    return new APIError(
      "Wrong credentials",
      "Either email and/or password are wrong.",
      422
    );
  }

  static errorUserIsDisabled() {
    return new APIError(
      "Account is disabled",
      "Please contact an Administrator.",
      422
    );
  }

  static errorUnsafePassword() {
    return new APIError(
      "Password is too weak",
      "Please refer to the password rules: at least 12 characters and at least 1 of the following categories: lowercase, uppercase, numerical, special character.",
      422
    );
  }

  static errorPasswordAlreadyUsed() {
    return new APIError(
      "Password matches already used one",
      "Please use a new one.",
      422
    );
  }

  static errorValidation(message) {
    return new APIError("Validation error", message, 422);
  }

  static errorUnknown() {
    return new APIError(
      "Unknown Error",
      "Please try again at a later time or report this issue.",
      500
    );
  }

  static errorReviewAlreadyExists(caseId) {
    return new APIError(
      "Review already exists",
      caseId
        ? `You can get the review with the case id ${caseId} or choose a differenct case id.`
        : "You can either get the review with this case id or choose another one.",
      409
    );
  }
}

module.exports = APIError;
