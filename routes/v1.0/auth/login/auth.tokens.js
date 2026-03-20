const crypto = require("crypto");
const APIError = require("../../../../utils/error");
const jwt = require("jsonwebtoken");
const { refresh_token } = require("../../../../models");

const createJWTtoken = async (user, expiresJWT) => {
  return jwt.sign(
    {
      sub: user.id,
      username: user.username,
      role: user.role,
      initialPassword: user.initialPassword,
    },
    process.env.JWT_SECRET,
    { expiresIn: expiresJWT, algorithm: "HS256" },
  );
};

const createRefreshToken = async (userID, expiresInDays) => {
  try {
    const refreshTokenNew = crypto.randomBytes(64).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    const refreshTokenHashed = crypto
      .createHash("sha256")
      .update(refreshTokenNew)
      .digest("hex");

    await refresh_token.create({
      userID,
      refreshToken: refreshTokenHashed,
      tokenActive: true,
      expiresAt,
    });

    return { refreshTokenNew, expiresAt };
  } catch (error) {
    console.error("Error creating refresh token:", error);
    throw APIError.errorUnknown();
  }
};

exports.createTokens = async function create_tokens(
  user,
  expiresJWT,
  expiresInDays,
  tokenDB,
) {
  try {
    if (!user) {
      throw APIError.errorUnauthorized();
    }

    if (!user.active) {
      throw APIError.errorUserIsDisabled();
    }

    if (tokenDB) {
      tokenDB.tokenActive = false;
      await tokenDB.save();
    }
    const JWTtoken = await createJWTtoken(user, expiresJWT);

    const { refreshTokenNew, expiresAt } = await createRefreshToken(
      user.id,
      expiresInDays,
    );
    return { JWTtoken, refreshTokenNew, expiresAt };
  } catch (error) {
    console.error("Error creating tokens:", error);
    throw APIError.errorUnknown();
  }
};
