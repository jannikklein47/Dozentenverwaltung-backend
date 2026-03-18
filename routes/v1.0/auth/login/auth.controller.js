const APIError = require("../../../../utils/error");
const { User } = require("../../../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const expiresJWT = 3600; // 1 Stunde
const expiresCookieInMs = expiresIn * 1000; // in Millisekunden

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      dummy = await bcrypt.compare(
        password,
        "$2b$10$0Pj9qkiOJGBturAPyaMrP.w1pGWgYIPL..URWPHNMkaYNE/Rak7jS",
      ); // Dummy-Vergleich, um Timing-Angriffe zu verhindern
      return next(APIError.errorWrongCredentials());
    }

    const isMatch = await bcrypt.compare(password, user.passwort);

    if (!isMatch) {
      return next(APIError.errorWrongCredentials());
    }

    if (!user.active) {
      // Überprüfen, ob der Benutzer aktiv ist
      return next(APIError.errorUserIsDisabled());
    }

    jwt.sign(
      { username: username, role: user.rolle },
      process.env.JWT_SECRET,
      {
        expiresIn: expiresJWT,
      },
      (err, token) => {
        if (err) {
          console.error("Error signing token:", err);
          return next(APIError.errorUnknown());
        }
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: expiresCookieInMs,
          })
          .status(200)
          .json({ message: "Login successful" });
      },
    );
  } catch (error) {
    console.error(error);
    next(APIError.errorUnknown());
  }
};
