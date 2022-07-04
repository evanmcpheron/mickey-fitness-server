const jwt = require("jsonwebtoken");
import { success, error, validation } from "../../Config/responseAPI";
import { Password } from "../../Services/password";

const { User } = require("../../Models/User");

module.exports = {
  signup: async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .send(
          error(
            "A user already exists with that email. Please try again.",
            res.statusCode
          )
        );
    }

    const user = new User({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JSON_WEB_TOKEN
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res
      .status(201)
      .send(success("You have succesfully registered", user, res.statusCode));
  },
  login: async (req, res) => {
    const { email, password, rememberMe } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .send(
          error(
            "You have entered an incorrect email or password. Please try again",
            res.statusCode
          )
        );
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      return res
        .status(400)
        .send(
          error(
            "You have entered an incorrect email or password. Please try again",
            res.statusCode
          )
        );
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JSON_WEB_TOKEN,
      { expiresIn: rememberMe ? "14d" : "24h" }
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(success("Welcome back", existingUser, res.statusCode));
  },
  signout: (req, res) => {
    req.session = null;
    res
      .status(200)
      .send(success("You have successfully signed out", {}, res.statusCode));
  },
};
