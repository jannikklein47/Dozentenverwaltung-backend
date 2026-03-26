const APIError = require("../../../../utils/error");
const { User } = require("../../../../models");
const bcrypt = require("bcryptjs");
exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ where: { username: username } }); // E-Mail wird als Username genutzt
    if (existingUser) {
      return next(APIError.errorUserAlreadyExists());
    }
    const hashedPassword = await bcrypt.hash(password, 14); // Passwort wird gehasht
    const newUser = await User.create({
      username: username,
      password: hashedPassword,
    }); // erstellt neuen user

    res // gibt zurück, dass der user erfolgreich registriert wurde mit der id des neuen users
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    next(error);
  }
};
