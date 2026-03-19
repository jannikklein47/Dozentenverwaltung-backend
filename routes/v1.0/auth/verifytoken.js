const jwt = require("jsonwebtoken");
const APIError = require("../../../utils/error");
const { User } = require("../../../models");

exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(APIError.errorUnauthorized());
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { username: decoded.username } });

    if (!user) {
      return next(APIError.errorUnauthorized());
    }

    if (!user.active) {
      return next(APIError.errorUserIsDisabled());
    }

    req.user = user; // Daten des Benutzers für nachfolgende Middleware oder Routenhandler verfügbar machen

    next();
  } catch (error) {
    console.error("Error during token verification:", error);
    return next(APIError.errorUnauthorized());
  }
};
