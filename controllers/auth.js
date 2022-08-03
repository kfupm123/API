const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, role, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      res.status(400).json({
        Error: "User already exist",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = new User({
        firstName,
        lastName,
        email,
        role,
        id: Date.now(),
        password: hashPassword,
      });
      user.save().then((user) => {
        return res.status(200).json({
          user,
        });
      });
    }
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existedUser = await User.findOne({ email: email.toLowerCase() });
    if (existedUser) {
      bcrypt.compare(password, existedUser.password).then((result) => {
        if (result) {
          const user = _.omit(existedUser.toObject(), [ "password"]);
          const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "1d",
          });
          res.status(200).json({
            accessToken,
            user,
          });
        } else {
          res.status(400).json({
            Error: "Invalid Username or Password.",
          });
        }
      });
    } else {
      res.status(400).json({
        Error: "Invalid Username or Password.",
      });
    }
  } catch (err) {
    res.status(400).json({ Error: "Something Went Wrong." });
  }
};

exports.checkLogin = (req, res) => {
  try {
    let token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";
    if (token) {
      const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return res.status(200).json({
        user,
      });
    } else {
      throw new Error("Token does not exist");
    }
  } catch (err) {
    return res.status(401).json({
      err: err ? (err.message ? err.message : err) : "Error",
    });
  }
};
