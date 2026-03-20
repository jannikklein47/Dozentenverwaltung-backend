const APIError = require("../../../../utils/error");
const { User, refresh_token } = require("../../../../models");
const bcrypt = require("bcryptjs");
const { createTokens } = require("./auth.tokens");
const { resetPassword } = require("../changePassword");
const expiresJWT = 300; // 5 Minuten in Sekunden
const refreshTokenExpiryDays = 7; // 7 Tage
const crypto = require("crypto");
const { Op } = require("sequelize");

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      const dummy = await bcrypt.compare(
        password,
        "$2b$14$M6m/TTFtDa/aM/thQ8d.juZu4jxW34NPmOW5VW.rez.paoM10fRNu",
      ); // Dummy-Vergleich, um Timing-Angriffe zu verhindern
      return next(APIError.errorWrongCredentials());
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(APIError.errorWrongCredentials());
    }

    try {
      await refresh_token.destroy({
        where: {
          userID: user.id,
          expiresAt: { [Op.lt]: new Date() }, // OP less than, delete tokens that are expired
        },
      });
    } catch (error) {
      console.error("Error cleaning up expired refresh tokens:", error);
    }

    const tokenData = await createTokens(
      user,
      expiresJWT,
      refreshTokenExpiryDays,
      null,
    );
    const { JWTtoken, refreshTokenNew, expiresAt } = tokenData;

    return res.status(200).json({
      message: "Login successful",
      initialPassword: user.initialPassword,
      accessToken: JWTtoken,
      refreshToken: refreshTokenNew,
      refreshTokenExp: expiresAt,
    });
  } catch (error) {
    if (error.statusCode) {
      return next(error);
    }
    console.error(error);
    return next(APIError.errorUnknown());
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

    if (!tokenDB.tokenActive) {
      console.warn(`Inactive refresh token used for user: ${tokenDB.userID}`);
      await refresh_token.destroy({ where: { userID: tokenDB.userID } });
      return next(APIError.errorUnauthorized());
    }

    if (new Date() > tokenDB.expiresAt) {
      await tokenDB.destroy();
      return next(APIError.errorUnauthorized());
    }

    const user = await User.findByPk(tokenDB.userID);

    const tokenData = await createTokens(
      user,
      expiresJWT,
      refreshTokenExpiryDays,
      tokenDB,
    );
    const { JWTtoken, refreshTokenNew, expiresAt } = tokenData;

    res.status(200).json({
      message: "Refresh Token successfull",
      accessToken: JWTtoken,
      initialPassword: user.initialPassword,
      refreshToken: refreshTokenNew,
      refreshTokenExp: expiresAt,
    });
  } catch (error) {
    if (error.statusCode) {
      return next(error);
    }
    console.error("Error refreshing token:", error);
    next(APIError.errorUnknown());
  }
};

exports.logout = async (req, res, next) => {
  try {
    const userID = req.tokenData.sub;
    const { refreshToken } = req.body;

    let all = req.query.all === "true";

    if (!refreshToken) {
      all = true;
    }

    let tokensDelete = 0;

    if (all) {
      tokensDelete = await refresh_token.destroy({ where: { userID } });
    } else {
      const refreshTokenHashed = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");
      const currentToken = await refresh_token.findOne({
        where: { refreshToken: refreshTokenHashed, userID },
      });

      if (currentToken)
        if (currentToken.tokenActive) {
          await currentToken.destroy();
          tokensDelete = 1;
        } else {
          console.warn(
            `Attempt to logout with inactive refresh token for user: ${userID}`,
          );
          tokensDelete = await refresh_token.destroy({ where: { userID } });
        }
    }

    res.status(200).json({
      message: `Logout successful`,
    });
    console.log(
      `User ${userID} logged out. Deleted ${tokensDelete} refresh tokens.`,
    );
  } catch (error) {
    if (error.statusCode) {
      return next(error);
    }
    console.error("Error during logout:", error);
    next(APIError.errorUnknown());
  }
};

exports.changeInitialPassword = async (req, res, next) => {
  try {
    const userID = req.tokenData.sub;
    const { newPassword, refreshToken } = req.body;
    const user = await User.findByPk(userID);

    const refreshTokenHashed = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const tokenDB = await refresh_token.findOne({
      where: { refreshToken: refreshTokenHashed, userID },
    });

    if (!tokenDB || !tokenDB.tokenActive || new Date() > tokenDB.expiresAt) {
      return next(APIError.errorUnauthorized());
    }

    if (!user) {
      return next(APIError.errorUnauthorized());
    }
    if (!user.initialPassword) {
      return next(
        APIError.errorBadRequest("Initial Passwort wurde bereits geändert."),
      );
    }
    await resetPassword(user, newPassword, false);

    const tokenData = await createTokens(
      user,
      expiresJWT,
      refreshTokenExpiryDays,
      tokenDB,
    );
    const { JWTtoken, refreshTokenNew, expiresAt } = tokenData;

    res.status(200).json({
      message: "Password changed successfully",
      accessToken: JWTtoken,
      refreshToken: refreshTokenNew,
      refreshTokenExp: expiresAt,
    });
  } catch (error) {
    if (error.statusCode) {
      return next(error);
    }
    console.error("Error changing initial password:", error);
    next(APIError.errorUnknown());
  }
};
