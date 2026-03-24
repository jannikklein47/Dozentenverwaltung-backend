const APIError = require("../../../utils/error");
const bcrypt = require("bcryptjs");

exports.resetPassword = async function resetPassword(
  user,
  newPassword,
  initialPassword,
) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 14);
    user.password = hashedPassword;
    user.initialPassword = initialPassword;
    await user.save();
  } catch (error) {
    console.error("Error changing password:", error);
    throw APIError.errorUnknown();
  }
};
