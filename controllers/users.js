const User = require("../models/user");
exports.sendDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: "driver" });
    if (drivers && drivers.length > 0) {
      res.status(200).json({
        drivers,
      });
    } else {
      res.status(404).json({
        Error: "Not Found.",
      });
    }
  } catch (err) {
    res.status(400).json({ Error: "Something Went Wrong." });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { createdAt: 0, updatedAt: 0, password: 0, _id: 0 }
    ).sort({ updatedAt: -1 });
    if (users.length > 0) {
      res.status(200).json({ users });
    } else {
      res.status(404).json({
        message: "Not Found.",
      });
    }
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    await User.findOneAndDelete({ email }).exec((err, user) => {
      if (err) {
        res.status(400).json({
          err,
        });
      } else if (user) {
        res.status(200).json({
          user,
        });
      } else {
        res.status(404).json({
          message: "Not Found",
        });
      }
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};
exports.updateUserLocation = async (req, res) => {
  const { id } = req.params;
  const { location } = req.body;
  if (location.hasOwnProperty("lat") && location.hasOwnProperty("lng")) {
    User.findOneAndUpdate({ id }, { lastLocation: location }, (err, user) => {
      if (err) {
        res.status(400).json({
          err,
        });
      } else {
        res.status(204).json({
          message: "Location updated Successfully.",
        });
      }
    });
  } else {
    res.status(400).json({
      message: "Some coordinate is missing.",
    });
  }
};
