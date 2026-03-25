const jwt = require("jsonwebtoken");
const APIError = require("../../../utils/error");

exports.verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    const tokenData = req.tokenData;

    if (!tokenData || !tokenData.role) {
      return next(APIError.errorUnauthorized());
    }

    if (!allowedRoles.includes(tokenData.role)) {
      return next(APIError.errorForbidden());
    }

    next();
  };
};
