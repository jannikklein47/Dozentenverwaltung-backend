const APIError = require("../../../../utils/error");
const { User, refresh_token } = require("../../../../models");
const bcrypt = require("bcryptjs");
const { resetPassword } = require("../../auth/changePassword");

exports.getSingleUser = async (req, res, next) => {
  try {
    const id = req.tokenData.sub;

    const user = await User.findByPk(id, {
      attributes: ["id", "username", "role", "createdAt", "updatedAt"],
    });

    if (!user) {
      return next(APIError.errorUserNotFound());
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(APIError.errorUnknown());
  }
};

exports.changeUsername = async (req, res, next) => {
  try {
    const id = req.tokenData.sub;
    const { username } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return next(APIError.errorUserNotFound());
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser && existingUser.id !== id) {
      return next(APIError.errorValidation("Username existiert bereits"));
    }

    user.username = username;
    await user.save();
    res
      .status(200)
      .json({ message: "Username updated successfully", username: username });
  } catch (error) {
    next(APIError.errorUnknown());
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const id = req.tokenData.sub;
    const { password, oldpassword } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return next(APIError.errorUserNotFound());
    }

    const isMatch = await bcrypt.compare(oldpassword, user.password);

    if (!isMatch) {
      return next(APIError.errorValidation("Altes Passwort ist inkorrekt"));
    }

    await resetPassword(user, password, false);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(APIError.errorUnknown());
  }
};
