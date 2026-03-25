const jwt = require("jsonwebtoken");
const APIError = require("../../../utils/error");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return next(APIError.errorUnauthorized());
  }

  let token = authHeader;

  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.slice("Bearer ".length).trim();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    if (
      decoded.initialPassword &&
      !req.path.endsWith("/changeinitialpassword")
    ) {
      return next(APIError.errorInitialPassword());
    }
    req.tokenData = decoded; // Benutzerinformationen im Request-Objekt speichern
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(APIError.errorUnauthorized());
    }
    if (error.name === "JsonWebTokenError") {
      return next(APIError.errorTokenMalformed());
    }
    console.error("Error during token verification:");
    return next(APIError.errorUnknown());
  }
};
