const APIError = require("../../../../utils/error");
const { User, refresh_token } = require("../../../../models");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res, next) => {
  try {
    const { count, rows } = await User.findAndCountAll();

    res.status(200).json({ total: count, users: rows });
  } catch (error) {
    next(APIError.errorUnknown());
  }
};

exports.activateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return next(APIError.errorUserNotFound());
    }

    await user.update({ active: true });
    res.status(200).json({ message: "User activated successfully" });
  } catch (error) {
    next(APIError.errorUnknown());
  }
};

exports.deactivateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return next(APIError.errorUserNotFound());
    }

    await user.update({ active: false });
    await refresh_token.destroy({ where: { userID: id } });
    res.status(200).json({ message: "User deactivated successfully" });
  } catch (error) {
    next(APIError.errorUnknown());
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return next(APIError.errorUserNotFound());
    }

    await user.destroy();
    await refresh_token.destroy({ where: { userID: id } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(APIError.errorUnknown());
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return next(APIError.errorUserNotFound());
    }

    await user.update(req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(APIError.errorUnknown());
  }
};

exports.resetUserPassword = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return next(APIError.errorUserNotFound());
    }

    const securePassword = generateSecureString(12);
    const hashedPassword = await bcrypt.hash(securePassword, 14);
    await user.update({ password: hashedPassword, initialPassword: true });
    res.status(200).json({ password: securePassword });
  } catch (error) {
    next(APIError.errorUnknown());
  }
};

/**
 * Generates a secure random string of the given length.
 * @param {number} len The length of the string to generate.
 * @returns {string} A secure random string of the given length.
 */
const generateSecureString = (len) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomValues = new Uint32Array(len);

  crypto.getRandomValues(randomValues);

  for (let i = 0; i < len; i++) {
    result += charset[randomValues[i] % charset.length];
  }

  return result;
};
