const crypto = require("crypto");
const APIError = require("../../../../utils/error");
const { refresh_token } = require("../../../../models");

exports.create_refresh_token = async function create_refresh_token(
  userID,
  expiresInDays,
) {
  try {
    const refreshToken_new = crypto.randomBytes(64).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    const refreshTokenHashed = crypto
      .createHash("sha256")
      .update(refreshToken_new)
      .digest("hex");

    await refresh_token.create({
      userID,
      refreshToken: refreshTokenHashed,
      tokenActive: true,
      expiresAt,
    });

    return { refreshToken_new, expiresAt };
  } catch (error) {
    console.error("Error creating refresh token:", error);
    throw APIError.errorUnknown();
  }
};
