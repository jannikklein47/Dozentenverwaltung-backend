const APIError = require("../../../../utils/error");
const { User, refresh_token } = require("../../../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { create_refresh_token } = require("./auth.refreshtoken");
const expiresJWT = 300; // 5 Minuten in Sekunden
const refreshTokenExpiryDays = 7; // 7 Tage
const crypto = require("crypto");

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      const dummy = await bcrypt.compare(
        password,
        "$2b$10$0Pj9qkiOJGBturAPyaMrP.w1pGWgYIPL..URWPHNMkaYNE/Rak7jS",
      ); // Dummy-Vergleich, um Timing-Angriffe zu verhindern
      return next(APIError.errorWrongCredentials());
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(APIError.errorWrongCredentials());
    }

    if (!user.active) {
      // Überprüfen, ob der Benutzer aktiv ist
      return next(APIError.errorUserIsDisabled());
    }

    const refreshTokenData = await create_refresh_token(
      user.id,
      refreshTokenExpiryDays,
    );
    const { refreshToken_new, expiresAt } = refreshTokenData;

    const JWTtoken = jwt.sign(
      { sub: user.id, username: username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: expiresJWT, algorithm: "HS256" },
    );

    return res.status(200).json({
      message: "Login successful",
      access_token: JWTtoken,
      refreshToken: refreshToken_new,
      refreshTokenExp: expiresAt,
    });
  } catch (error) {
    console.error(error);
    next(APIError.errorUnknown());
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const refreshTokenHashed = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // search for active refresh token in DB
    const tokenDB = await refresh_token.findOne({
      where: { refreshToken: refreshTokenHashed },
    });

    if (!tokenDB) {
      return next(APIError.errorUnauthorized());
    }

    if (new Date() > tokenDB.expiresAt) {
      await tokenDB.destroy();
      return next(APIError.errorUnauthorized());
    }

    const user = await User.findByPk(tokenDB.userID);

    if (!user) {
      return next(APIError.errorUnauthorized());
    }

    if (!user.active) {
      return next(APIError.errorUserIsDisabled());
    }

    const JWTtoken = jwt.sign(
      { sub: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: expiresJWT, algorithm: "HS256" },
    );

    const newRefreshTokenData = await create_refresh_token(
      user.id,
      refreshTokenExpiryDays,
    );
    const { refreshToken_new, expiresAt } = newRefreshTokenData;

    await tokenDB.destroy();

    res.status(200).json({
      message: "Refresh Token successfull",
      accessToken: JWTtoken,
      refreshToken: refreshToken_new,
      refreshTokenExp: expiresAt,
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    next(APIError.errorUnknown());
  }
};

exports.logout = async (req, res, next) => {
  try {
    const userID = req.tokenData.sub;
    const { refreshToken } = req.body;

    const all = req.query.all === true;

    const refreshTokenHashed = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    if (all) {
      await refresh_token.destroy({ where: { userID } });
    } else {
      await refresh_token.destroy({
        where: { refreshToken: refreshTokenHashed, userID },
      });
    }
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    next(APIError.errorUnknown());
  }
};
