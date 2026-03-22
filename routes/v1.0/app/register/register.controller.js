const APIError = require("../../../../utils/error");
const { User } = require("../../../../models");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { username: email } }); // E-Mail wird als Username genutzt
    if (existingUser) {
      return next(APIError.errorUserAlreadyExists());
    }
    const newUser = await User.create({ username: email, passwort: password }); // erstellt neuen user

    res // gibt zurück, dass der user erfolgreich registriert wurde mit der id des neuen users
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    next(error);
  }
};
