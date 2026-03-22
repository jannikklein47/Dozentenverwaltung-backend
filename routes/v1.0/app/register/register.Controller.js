const APIError = require("../../../utils/APIError");
const { userdaten } = require("../../../models");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userdaten.findOne({ where: { email } }); // guckt ob user schon exisitiert
    if (existingUser) {
      return next(APIError.errorUserAlreadyExists());
    }
    const newUser = await userdaten.create({ email, password }); // erstellt neuen user

    res // gibt zurück, dass der user erfolgreich registriert wurde mit der id des neuen users
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    next(error);
  }
};
